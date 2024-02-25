import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import {ResponseBuilder} from "../utils/ResponseBuilder";
import {UserService} from "../services/UserService";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["access-token"];
    if (!token) {
        return ResponseBuilder.send(res, 403, "A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await UserService.getUserById(userId); // redis can be used here to stop multiple db calls.
        if(!user) {
            return ResponseBuilder.send(res, 401, "Invalid User");
        }
    } catch (err) {
        return ResponseBuilder.send(res, 401, "Invalid Token");
    }
    return next();
};
