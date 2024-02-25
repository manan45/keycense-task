import {ResponseBuilder} from "../utils/ResponseBuilder";
import {UserService} from "../services/UserService";


export class UserController {
    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if(!refreshToken) {
                return ResponseBuilder.send(res, 400,  'Refresh token is required', {})
            }
            const userId = await UserService.checkIfTokenIsValid(refreshToken);
            if(!userId) {
                return ResponseBuilder.send(res, 401, 'Invalid refresh token', {})
            }

            const newToken = await UserService.generateToken(userId);
            return ResponseBuilder.send(res, 200,  'Token refreshed successfully', {newToken})

        } catch (error) {
            console.error(error);
            return ResponseBuilder.send(res, 500,  'Internal Server Error', {});
        }

    }

    static async getUser(req, res) {
        try {
            const { userId } = req.params;
            if(!userId) {
                return ResponseBuilder.send(res, 400,'User id is required', {})
            }
            const user = await UserService.getUserById(userId);
            console.log(user);
            if(user && Object.keys(user).length > 1) {
                return ResponseBuilder.send(res, 200, 'Data fetched successfully', user)
            }
            return ResponseBuilder.send(res, 404,  'Data not found', {})
        } catch (e) {
            console.error(e);
            return ResponseBuilder.send(res, 500, 'Internal Server Error', {})
        }

    }
}