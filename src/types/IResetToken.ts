import type { Document, Types } from "mongoose";

export interface IResetToken extends Document {
    id?: string;
    userId: Types.ObjectId;
    requestId: string;
    expiry: Date;
}