import type { IResetToken } from "@/types/IResetToken.js";
import { BaseRepository } from "../baseRepository.js";
import type { IResetRepository } from "../interfaces/IResetRepository.js";
import { inject, injectable } from "tsyringe";
import type { FilterQuery, Model } from "mongoose";

@injectable()
export class ResetRepository extends BaseRepository<IResetToken> implements IResetRepository {
    constructor(
        @inject("ResetModel") model: Model<IResetToken>
    ) {
        super(model);
    }


    async findOne(query: FilterQuery<IResetToken>): Promise<IResetToken | undefined> {
        const doc = await this._model.findOne(query);
        return doc?.toJSON();
    }
}