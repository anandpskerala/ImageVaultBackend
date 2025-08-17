import type { IAuthService } from "@/services/interfaces/IAuthService.js";
import type { CustomRequest } from "@/types/CustomRequest.js";
import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthController {
    constructor(
        @inject("IAuthService") private _authService: IAuthService
    ) {}

    public login = async (req: Request, res: Response): Promise<void> => {
        const { emailOrPhone, password } = req.body;
        const result = await this._authService.login(emailOrPhone, password, res);
        res.status(result.status).json({message: result.message, user: result.user});
    }

    public register = async (req: Request, res: Response): Promise<void> => {
        const { firstName, lastName, email, phone, password } = req.body;
        const result = await this._authService.register({
            firstName,
            lastName,
            email,
            phone,
            password,
        }, res);
        res.status(result.status).json({ message: result.message, user: result.user });
    }

    public refreshToken = async (req: Request, res: Response): Promise<void> => {
        const token = req.cookies.refreshToken;
        const result = await this._authService.refreshToken(token, res);
        res.status(result.status).json({ message: result.message });
    }

    public verifyUser = async (req: CustomRequest, res: Response): Promise<void> => {
        const userId = req.userId as string;
        const result = await this._authService.verifyUser(userId);
        res.status(result.status).json({ message: result.message, user: result.user });
    }

    public logOut = async (req: Request, res: Response): Promise<void> => {
        const result = await this._authService.logOut(res);
        res.status(result.status).json({ message: result.message });
    }

    public changeUserDetails = async (req: Request, res: Response): Promise<void> => {
        const { firstName, lastName, email, phone, currentPassword, newPassword } = req.body;
        const user = {
            firstName,
            lastName,
            phone,
            email,
            password: currentPassword,
            newPassword,
        }
        const result = await this._authService.changeUserdetails(user);
        res.status(result.status).json({ message: result.message, user: result.user });
    }

    public forgotPassword = async (req: Request, res: Response): Promise<void> => {
        const { email } = req.body;
        const result = await this._authService.forgotPassword(email);
        res.status(result.status).json({message: result.message});
    }

    public resetPassword = async (req: Request, res: Response): Promise<void> => {
        const requestId = req.params.id as string;
        const { newPassword } = req.body;
        const result = await this._authService.resetPassword(requestId, newPassword);
        res.status(result.status).json({message: result.message});
    }
}