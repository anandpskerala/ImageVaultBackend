import jwt from "jsonwebtoken";
import type { IUserRepository } from "@/repositories/interfaces/IUserRepository.js";
import type { IAuthService } from "@/services/interfaces/IAuthService.js";
import type { UserReturnType } from "@/types/ReturnType.js";
import { StatusCode } from "@/types/StatusCode.js";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "@/utils/tokenUtils.js";
import type { Response } from "express";
import { config } from "@/config.js";
import { UserMapper } from "@/dtos/userDtos.js";
import type { IUser } from "@/types/IUser.js";
import type { IResetRepository } from "@/repositories/interfaces/IResetRepository.js";
import { Types } from "mongoose";
import { createPasswordResetEmail, transporter } from "@/utils/transport.js";


@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject("IUserRepository") private _repository: IUserRepository,
        @inject("IResetRepository") private _resetRepo: IResetRepository
    ) {

    }

    public async login(emailOrPhone: string, password: string, res: Response): Promise<UserReturnType> {
        try {
            const existing = await this._repository.findWithEmailOrPhone(emailOrPhone);
            if (!existing) {
                return { message: "Invalid credentials", status: StatusCode.FORBIDDEN };
            }

            const isMatch = await bcrypt.compare(password, existing.password);
            if (!isMatch) {
                return { message: "Invalid credentials", status: StatusCode.FORBIDDEN };
            }

            const refreshToken = generateRefreshToken(existing.id as string);
            const accessToken = generateAccessToken(existing.id as string, existing.email);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 15 * 60 * 1000
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return { message: "Login successful", status: StatusCode.OK, user: UserMapper.toDTO(existing) };

        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }


    public async register(userData: Partial<IUser>, res: Response): Promise<UserReturnType> {
        try {
            const existing = await this._repository.findExistingUser(userData.email as string, userData.phone as string);
            if (existing) {
                return { message: "User already exists", status: StatusCode.BAD_REQUEST };
            }

            const hashedPassword = await bcrypt.hash(userData.password as string, 10);
            const newUser = await this._repository.create({ ...userData, password: hashedPassword });

            const refreshToken = generateRefreshToken(newUser.id as string);
            const accessToken = generateAccessToken(newUser.id as string, newUser.email);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 15 * 60 * 1000
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return { message: "Signup successful", status: StatusCode.OK, user: UserMapper.toDTO(newUser) };
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }

    public async refreshToken(token: string, res: Response): Promise<UserReturnType> {
        try {
            if (!token) {
                return { message: "Refresh token not found", status: StatusCode.UNAUTHORIZED };
            }

            const decoded = jwt.verify(token, config.jwt) as { userId: string };
            const user = await this._repository.findById(decoded.userId);
            if (!user) {
                return { message: "User not found", status: StatusCode.NOT_FOUND };
            }

            const accessToken = generateAccessToken(user.id as string, user.email);

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 15 * 60 * 1000
            });

            return { message: "Token refreshed", status: StatusCode.OK, user: UserMapper.toDTO(user) };
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }

    public async verifyUser(userId: string): Promise<UserReturnType> {
        try {
            if (!userId) {
                return { message: "Invalid user Id", status: StatusCode.BAD_REQUEST };
            }

            const user = await this._repository.findById(userId);
            if (!user) {
                return { message: "User not found", status: StatusCode.NOT_FOUND };
            }

            return { message: "", status: StatusCode.OK, user: UserMapper.toDTO(user) };
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }

    public async logOut(res: Response): Promise<UserReturnType> {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return { message: "Logout successful", status: StatusCode.OK };
    }

    public async changeUserdetails(userData: Partial<IUser & { newPassword: string }>): Promise<UserReturnType> {
        try {
            const user = await this._repository.findOne({ email: userData.email });
            if (!user) {
                return { message: "User not found", status: StatusCode.NOT_FOUND };
            }

            user.firstName = userData.firstName!;
            user.lastName = userData.lastName!;
            user.phone = userData.phone!;

            const isPasswordUpdate = userData.password || userData.newPassword;
            if (isPasswordUpdate) {
                const isMatch = await bcrypt.compare(userData.password as string, user.password);
                if (!isMatch) {
                    return { message: "Current password is incorrect", status: StatusCode.BAD_REQUEST };
                }
                user.password = await bcrypt.hash(userData.newPassword as string, 10);
            }

            await this._repository.updateUser(user.id as string, user);
            return { message: isPasswordUpdate ? "Password updated" : "Profile updated", status: StatusCode.OK, user: UserMapper.toDTO(user) };
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }

    public async forgotPassword(email: string): Promise<UserReturnType> {
        try {
            const user = await this._repository.findOne({ email });
            if (!user) {
                return {
                    message: "User not found",
                    status: StatusCode.BAD_REQUEST
                }
            }

            let token = await this._resetRepo.findOne({ userId: user.id });
            if (!token) {
                token = await this._resetRepo.create({ userId: new Types.ObjectId(user.id) });
            }
            const resetUrl = `${config.frontend}/reset-password/${token.requestId}?email=${email}`;
            transporter.sendMail({
                to: email,
                from: `"${process.env.COMPANY_NAME || 'ImageVault'}"`,
                subject: '🔐 Reset Your Password - Action Required',
                html: createPasswordResetEmail(resetUrl, email, 'ImageVault'),
                text: `Password Reset Request
    
Hello ${user.firstName} ${user.lastName},

You requested a password reset for your account (${email}). 

Click this link to reset your password: ${resetUrl}

This link will expire in 30 minutes for security reasons.

If you didn't request this reset, you can safely ignore this email.

Best regards,
ImageVault Team`,
            });

            return {
                message: "Reset email sent",
                status: StatusCode.OK
            }
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }


    public async resetPassword(requestId: string, newPassword: string): Promise<UserReturnType> {
        try {
            const token = await this._resetRepo.findOne({requestId});
            if (!token) {
                return {
                    message: "Invalid or expired token",
                    status: StatusCode.FORBIDDEN
                }
            }

            const password = await bcrypt.hash(newPassword, 10);
            await this._repository.update(token.userId.toString(), {password});
            return {
                message: "Password reset successful",
                status: StatusCode.OK
            }
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }
}