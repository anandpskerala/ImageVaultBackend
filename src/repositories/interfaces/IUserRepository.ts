import type { IUser } from "@/types/IUser.js";
import type { FilterQuery } from "mongoose";

export interface IUserRepository {
    create(userData: Partial<IUser>): Promise<IUser>;
    findById(id: string): Promise<IUser | undefined>;
    update(id: string, userData: Partial<IUser>): Promise<void>;
    delete(id: string): Promise<void>;
    findWithEmailOrPhone(emailOrPhone: string): Promise<IUser | undefined>;
    findExistingUser(email: string, phone: string): Promise<IUser | undefined>;
    findOne(query: FilterQuery<IUser>): Promise<IUser | undefined>;
    updateUser(id: string, userData: Partial<IUser>): Promise<void>
}