import type { Document } from "mongoose";

export interface IUser extends Document {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    createdAt: string;
}