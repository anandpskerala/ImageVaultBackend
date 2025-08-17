import { AuthController } from "@/controllers/authController.js";
import { UploadController } from "@/controllers/uploadController.js";
import "reflect-metadata";
import { container } from "tsyringe";

export const registerController = () => {
    container.register<AuthController>(AuthController, {useClass: AuthController});
    container.register<UploadController>(UploadController, {useClass: UploadController});
}