import type { Model } from "mongoose";

export abstract class BaseRepository<T> {
    constructor(protected _model: Model<T>) {}

    async create(data: Partial<T>): Promise<T> {
        const doc = await this._model.create(data);
        return doc.toJSON() as T;
    }

    async findById(id: string): Promise<T | undefined> {
        const doc = await this._model.findById(id);
        return doc ? (doc.toJSON() as T) : undefined;
    }

    async update(id: string, data: Partial<T>): Promise<void> {
        await this._model.updateOne({_id: id}, {$set: data});
    }

    async delete(id: string): Promise<void> {
        await this._model.deleteOne({_id: id});
    }
}