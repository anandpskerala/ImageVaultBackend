import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "@/repositories/implementation/UserRepository.js";
import type { IUserRepository } from "@/repositories/interfaces/IUserRepository.js";
import type { IUploadRepository } from "@/repositories/interfaces/IUploadRepository.js";
import { UploadRepository } from "@/repositories/implementation/UploadRepository.js";
import { ResetRepository } from "@/repositories/implementation/ResetRepository.js";
import type { IResetRepository } from "@/repositories/interfaces/IResetRepository.js";

export const registerRepositories = () => {
    container.register<IUserRepository>("IUserRepository", { useClass: UserRepository });
    container.register<IUploadRepository>("IUploadRepository", { useClass: UploadRepository });
    container.register<IResetRepository>("IResetRepository", { useClass: ResetRepository });
}