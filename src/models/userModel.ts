import type { IUser } from "@/types/IUser.js";
import mongoose from "mongoose";

const schema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret: Partial<IUser>) => {
        ret.id = ret._id as string;
        delete ret._id;
    }
});



const userModel = mongoose.model<IUser>("User", schema);

export default userModel;