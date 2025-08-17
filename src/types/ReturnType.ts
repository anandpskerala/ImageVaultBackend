import type { UserDTO } from "@/dtos/userDtos.js";
import type { StatusCode } from "@/types/StatusCode.js";
import type { IUpload } from "./IUpload.js";

export interface UserReturnType {
    message: string;
    status: StatusCode;
    user?: UserDTO;
}


export interface UploadReturnType {
    message: string;
    status: StatusCode;
    images?: IUpload[];
}

export interface ImageReturnType {
    message: string;
    status: StatusCode;
    image?: IUpload;
}