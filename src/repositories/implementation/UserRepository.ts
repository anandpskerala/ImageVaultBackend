import { BaseRepository } from "@/repositories/baseRepository.js";
import type { IUser } from "@/types/IUser.js";
import type { IUserRepository } from "../interfaces/IUserRepository.js";
import type { FilterQuery, Model } from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor(@inject("UserModel") model: Model<IUser>) {
        super(model);
    }

    async findWithEmailOrPhone(emailOrPhone: string): Promise<IUser | undefined> {
        const doc = await this._model.findOne({$or: [{email: emailOrPhone}, {phone: emailOrPhone}]});
        return doc?.toJSON();
    }

    async findExistingUser(email: string, phone: string): Promise<IUser | undefined> {
        const doc = await this._model.findOne({$or: [{email: email}, {phone: phone}]});
        return doc?.toJSON();
    }

    async findOne(query: FilterQuery<IUser>): Promise<IUser | undefined> {
        const doc = await this._model.findOne(query);
        return doc?.toJSON();
    }

    async updateUser(id: string, userData: Partial<IUser>): Promise<void> {
        return super.update(id, userData);
    }
}