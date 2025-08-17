import type { Document, Types } from "mongoose";

export interface IUpload extends Document {
    id?: string;
    userId: Types.ObjectId;
    title: string;
    url: string;
    publicId: string;
    position: number;
}