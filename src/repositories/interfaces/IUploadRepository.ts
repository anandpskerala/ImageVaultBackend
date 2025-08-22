import type { UploadDTO } from "@/dtos/uploadDtos.js";
import type { IUpload } from "@/types/IUpload.js";
import type { FilterQuery } from "mongoose";

export interface IUploadRepository {
    create(userData: Partial<IUpload>): Promise<IUpload>;
    findById(id: string): Promise<IUpload | undefined>;
    update(id: string, userData: Partial<IUpload>): Promise<void>;
    delete(id: string): Promise<void>;
    uploadFiles(files: UploadDTO[]): Promise<IUpload[]>;
    findLastPosition(userId: string): Promise<number>;
    getImages(userId: string, page: number, search: string, limit: number): Promise<{images: IUpload[], total: number}>;
    findByQuery(query: FilterQuery<IUpload>): Promise<IUpload[]>;
    updateWithQuery(id: string, query: FilterQuery<IUpload>): Promise<void>
}