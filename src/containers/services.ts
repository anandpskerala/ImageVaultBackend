import { AuthService } from "@/services/implementation/authService.js";
import { UploadService } from "@/services/implementation/uploadService.js";
import type { IAuthService } from "@/services/interfaces/IAuthService.js";
import type { IUploadService } from "@/services/interfaces/IUploadService.js";
import "reflect-metadata";
import { container } from "tsyringe";

export const registerServices = () => {
    container.register<IAuthService>("IAuthService", { useClass: AuthService });
    container.register<IUploadService>("IUploadService", { useClass: UploadService });
}