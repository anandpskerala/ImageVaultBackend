import type { UploadDTO } from "@/dtos/uploadDtos.js";
import type { IUploadRepository } from "@/repositories/interfaces/IUploadRepository.js";
import type { IUploadService } from "@/services/interfaces/IUploadService.js";
import type { IUpload } from "@/types/IUpload.js";
import type { ImageReturnType, UploadReturnType } from "@/types/ReturnType.js";
import { StatusCode } from "@/types/StatusCode.js";
import { destroyFile, uploadFile, uploadMultipleFile } from "@/utils/cloudinary.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class UploadService implements IUploadService {
    constructor(@inject("IUploadRepository") private _repo: IUploadRepository) {

    }

    async uploadImages(userId: string, files: Express.Multer.File[], titles: string[]): Promise<UploadReturnType> {
        try {
            if (!Array.isArray(titles) || titles.length !== files.length) {
                return {
                    message: "Titles must be an array matching the number of files",
                    status: StatusCode.BAD_REQUEST
                }
            }

            const sanitizedTitles = titles.map(title => title.trim()).filter(title => title.length > 0);

            if (sanitizedTitles.length !== titles.length) {
                return {
                    message: "Titles must be an array matching the number of files",
                    status: StatusCode.BAD_REQUEST,
                };
            }

            const existingTitles = await this._repo.findByQuery({
                userId,
                title: { $in: sanitizedTitles },
            });
            if (existingTitles.length > 0) {
                return {
                    message: "One or more titles already exist",
                    status: StatusCode.BAD_REQUEST,
                };
            }

            let position = await this._repo.findLastPosition(userId);
            const uploads: UploadDTO[] = await uploadMultipleFile(titles, files, userId, position);
            const images = await this._repo.uploadFiles(uploads);
            return {
                message: "Images uploaded successfully",
                status: StatusCode.CREATED,
                images: images
            }
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }


    async editImage(userId: string, imageId: string, title: string, file?: Express.Multer.File): Promise<ImageReturnType> {
        try {
            const asset = await this._repo.findById(imageId);
            if (!asset) {
                return {
                    message: "Image not found",
                    status: StatusCode.BAD_REQUEST
                }
            }

            const existingTitles = await this._repo.findByQuery({
                userId,
                title: title,
                _id: { $ne: imageId }
            });
            if (existingTitles.length > 0) {
                return {
                    message: "One or more titles already exist",
                    status: StatusCode.BAD_REQUEST,
                };
            }

            asset.title = title;
            if (file) {
                const image = await uploadFile(file.path);
                const prevId = asset.publicId;
                asset.publicId = image.public_id;
                asset.url = image.secure_url;
                await destroyFile(prevId);
            }

            await this._repo.update(asset.id as string, { title, url: asset.url, publicId: asset.publicId });
            return {
                message: "Image updated",
                status: StatusCode.OK,
                image: asset
            }
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }

    async deleteImage(imageId: string): Promise<ImageReturnType> {
        try {
            const asset = await this._repo.findById(imageId);
            if (!asset) {
                return {
                    message: "Image not found",
                    status: StatusCode.BAD_REQUEST
                }
            }
            await this._repo.delete(asset.id as string);
            await destroyFile(asset.publicId);
            return {
                message: "Image deleted",
                status: StatusCode.OK
            }
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }

    async getImages(userId: string, page: number, search: string, limit: number): Promise<UploadReturnType & { total?: number }> {
        try {
            const { images, total } = await this._repo.getImages(userId, page, search, limit);
            return {
                message: "Fetched images",
                status: StatusCode.OK,
                images,
                total
            }
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }

    async reArrangeOrder(userId: string, images: IUpload[]): Promise<UploadReturnType> {
        try {
            const userImages = await this._repo.findByQuery({ userId, _id: { $in: images.map(img => img.id) } });
            if (userImages.length !== images.length) {
                return {
                    message: "Unauthorized access to some images",
                    status: StatusCode.UNAUTHORIZED
                }
            }

            const updatePromises = images.map(({ id, position }) =>
                this._repo.updateWithQuery(id as string, { position })
            );

            await Promise.all(updatePromises);
            return {
                message: "Order updated successfully",
                status: StatusCode.OK
            }
        } catch (error) {
            console.log(error);
            return {
                message: "Internal Server error",
                status: StatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }
}