import { config } from "@/config.js";
import type { CustomRequest } from "@/types/CustomRequest.js";
import { StatusCode } from "@/types/StatusCode.js";
import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const protectRoute = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies?.accessToken
    if (!token) {
        res.status(StatusCode.UNAUTHORIZED).json({ message: "Not authenticated" });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.jwt) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error(err)
        res.status(403).json({ message: "nvalid or expired token" });
        return;
    }
};