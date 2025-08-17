import type { IUpload } from "@/types/IUpload.js";
import { BaseRepository } from "@/repositories/baseRepository.js";
import type { IUploadRepository } from "@/repositories/interfaces/IUploadRepository.js";
import { inject, injectable } from "tsyringe";
import type { FilterQuery, Model } from "mongoose";
import type { UploadDTO } from "@/dtos/uploadDtos.js";


@injectable()
export class UploadRepository extends BaseRepository<IUpload> implements IUploadRepository {
    constructor(@inject("UploadModel") model: Model<IUpload>) {
        super(model);
    }

    async uploadFiles(files: UploadDTO[]): Promise<IUpload[]> {
        const docs = await this._model.insertMany(files);
        const items =  docs.map(doc => doc.toJSON());
        return items;
    }

    async findLastPosition(userId: string): Promise<number> {
        const maxImgPos = await this._model.findOne({userId}).sort({position: -1});
        const position = maxImgPos ? maxImgPos.position + 1 : 1;
        return position;
    }


    async getImages(userId: string): Promise<{images: IUpload[], total: number}> {
        const [images, total] = await Promise.all([
            this._model.find({userId}).sort({position: -1}),
            this._model.countDocuments({userId})
        ]);
        return {images, total};
    }

    async findByQuery(query: FilterQuery<IUpload>): Promise<IUpload[]> {
        const docs = await this._model.find(query);
        return docs.map((doc) => doc.toJSON());
    }

    async updateWithQuery(id: string, query: FilterQuery<IUpload>): Promise<void> {
        await this._model.findByIdAndUpdate(id, query, {new: true});
    }
}