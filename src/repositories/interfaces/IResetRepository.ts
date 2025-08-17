import type { IResetToken } from "@/types/IResetToken.js";
import type { FilterQuery } from "mongoose";

export interface IResetRepository {
    create(data: Partial<IResetToken>): Promise<IResetToken>;
    findById(id: string): Promise<IResetToken | undefined>;
    update(id: string, data: Partial<IResetToken>): Promise<void>;
    delete(id: string): Promise<void>;
    findOne(query: FilterQuery<IResetToken>): Promise<IResetToken | undefined>;
}