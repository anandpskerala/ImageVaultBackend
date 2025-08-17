import type { IUpload } from "@/types/IUpload.js";
import type { ImageReturnType, UploadReturnType } from "@/types/ReturnType.js";

export interface IUploadService {
    uploadImages(userId: string, files: Express.Multer.File[], titles: string[]): Promise<UploadReturnType>;
    editImage(imageId: string, title: string, file?: Express.Multer.File): Promise<ImageReturnType>;
    deleteImage(imageId: string): Promise<ImageReturnType>;
    getImages(userId: string): Promise<UploadReturnType & {total?: number}>;
    reArrangeOrder(userId: string, images: IUpload[]): Promise<UploadReturnType>;
}