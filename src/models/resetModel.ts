import type { IResetToken } from "@/types/IResetToken.js";
import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema<IResetToken>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    requestId: {
        type: String,
        required: true,
        default: () => crypto.randomUUID()
    },
    expiry: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 30 * 60 * 1000),
        expires: 30 * 60 
    }
}, {timestamps: true});

const resetModel = mongoose.model("ResetRequest", schema);
export default resetModel;

