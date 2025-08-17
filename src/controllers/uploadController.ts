import type { IUploadService } from "@/services/interfaces/IUploadService.js";
import type { CustomRequest } from "@/types/CustomRequest.js";
import type { Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class UploadController {
    constructor(
        @inject("IUploadService") private _service: IUploadService
    ) {}

    public uploadImages = async (req: CustomRequest, res: Response): Promise<void> => {
        const userId = req.userId as string;
        const { titles } = req.body;
        const files = req.files;
        const result = await this._service.uploadImages(userId, files as Express.Multer.File[], Array.isArray(titles) ? titles: [titles]);
        res.status(result.status).json({message: result.message, images: result.images});
    }

    public editImage = async (req: CustomRequest, res: Response): Promise<void> => {
        const imageId = req.params.id;
        const { title } = req.body;
        const file = req.file;
        const result = await this._service.editImage(imageId as string, title, file);
        res.status(result.status).json({message: result.message, image: result.image});
    }

    public deleteImage = async (req: CustomRequest, res: Response): Promise<void> => {
        const imageId = req.params.id;
        const result = await this._service.deleteImage(imageId as string);
        res.status(result.status).json({message: result.message});
    }

    public getImages = async (req: CustomRequest, res: Response): Promise<void> => {
        const userId = req.userId as string;
        const result = await this._service.getImages(userId);
        res.status(result.status).json({message: result.message, images: result.images, total: result.total});
    }

    public reArrangeOrder = async (req: CustomRequest, res: Response): Promise<void> => {
        const userId = req.userId as string;
        const { images } = req.body;
        const result = await this._service.reArrangeOrder(userId, images);
        res.status(result.status).json({message: result.message, images: result.images});
    }
}