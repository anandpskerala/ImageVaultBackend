import type { IUpload } from "@/types/IUpload.js";
import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema<IUpload>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret: Partial<IUpload>) => {
        ret.id = ret._id as string;
        delete ret._id;
    }
});

const uploadModel = mongoose.model<IUpload>("Uploads", schema);

export default uploadModel;