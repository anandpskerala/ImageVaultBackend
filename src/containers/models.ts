import resetModel from "@/models/resetModel.js";
import uploadModel from "@/models/uploadModel.js";
import userModel from "@/models/userModel.js";
import type { IResetToken } from "@/types/IResetToken.js";
import type { IUpload } from "@/types/IUpload.js";
import type { IUser } from "@/types/IUser.js";
import type { Model } from "mongoose";
import { container } from "tsyringe";

export const registerModels = () => {
    container.register<Model<IUser>>("UserModel", { useValue: userModel });
    container.register<Model<IUpload>>("UploadModel", { useValue: uploadModel });
    container.register<Model<IResetToken>>("ResetModel", { useValue: resetModel });
}