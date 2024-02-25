import * as jwt from "jsonwebtoken";
import Users from "../models/Users";

export class UserService {

    static async checkIfTokenIsValid(token: string): Promise<number> {
        try {
            console.log(token, process.env.JWT_SECRET)
            const ifValidToken = await Users.findOne({refreshToken: token});
            if(!ifValidToken) {
                return 0;
            }

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
            // If the token is valid, return the user id
            return decoded.userId;
        } catch (error) {
            console.error(error)
            // If the token is invalid, throw an error
            return 0;
        }
    }

    static async generateToken(userId: number): Promise<string> {
        // Generate a new token with the user id
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '48h' });
        return token;
    }

    static async getUserById(userId: number) {
        // Fetch user from the database
        console.log({ where: { userId: userId } })
        return Users.findOne({ userId: userId });
    }
}
