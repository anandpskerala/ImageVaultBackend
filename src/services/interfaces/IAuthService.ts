import type { IUser } from "@/types/IUser.js";
import type { UserReturnType } from "@/types/ReturnType.js";
import type { Response } from "express";

export interface IAuthService {
    login(emailOrPhone: string, password: string, res: Response): Promise<UserReturnType>;
    register(userData: Partial<IUser>, res: Response): Promise<UserReturnType>;
    refreshToken(token: string, res: Response): Promise<UserReturnType>;
    verifyUser(userId: string): Promise<UserReturnType>;
    logOut(res: Response): Promise<UserReturnType>;
    changeUserdetails(userData: Partial<IUser & { newPassword: string }>): Promise<UserReturnType>;
    forgotPassword(email: string): Promise<UserReturnType>;
    resetPassword(requestId: string, newPassword: string): Promise<UserReturnType>;
}