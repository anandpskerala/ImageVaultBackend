import type { IUser } from "@/types/IUser.js";

export interface UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: string;
}

export class UserMapper {
    static toDTO(user: IUser): UserDTO {
        return {
            id: user.id || '',
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt
        };
    }

    static toDTOs(users: IUser[]): UserDTO[] {
        return users.map(user => this.toDTO(user));
    }
}