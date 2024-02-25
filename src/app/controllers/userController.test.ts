import { ResponseBuilder } from "../utils/ResponseBuilder";
import { UserController } from "./userController";
import { UserService } from "../services/UserService";

// Mock ResponseBuilder
jest.mock("../utils/ResponseBuilder");
jest.mock('../services/UserService');

describe("UserController", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("refreshToken", () => {
        it("should return 400 if refreshToken is not provided", async () => {
            const req = { body: {} };
            const res = {};

            await UserController.refreshToken(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 400, "Refresh token is required", {});
        });

        it("should return 401 if refreshToken is invalid", async () => {
            const req = { body: { refreshToken: "invalidToken" } };
            const res = {};

            (UserService.checkIfTokenIsValid as jest.Mock).mockResolvedValue(null);

            await UserController.refreshToken(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 401, "Invalid refresh token", {});
        });

        it("should return 200 with new token if refreshToken is valid", async () => {
            const req = { body: { refreshToken: "validToken" } };
            const res = {};

            (UserService.checkIfTokenIsValid as jest.Mock).mockResolvedValue("userId");
            (UserService.generateToken as jest.Mock).mockResolvedValue("newToken");

            await UserController.refreshToken(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 200, "Token refreshed successfully", { newToken: "newToken" });
        });

        it("should return 500 for internal server error", async () => {
            const req = { body: { refreshToken: "validToken" } };
            const res = {};

            (UserService.checkIfTokenIsValid as jest.Mock).mockRejectedValue(new Error("Internal Server Error"));

            await UserController.refreshToken(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 500, "Internal Server Error", {});
        });
    });

    describe("getUserById", () => {
        it("should return 400 if userId is not provided", async () => {
            const req = { params: {} };
            const res = {};

            await UserController.getUser(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 400, "User id is required", {});
        });

        it("should return 404 if user is not found", async () => {
            const req = { params: { userId: "nonExistentId" } };
            const res = {};

            (UserService.getUserById as jest.Mock).mockResolvedValue({});

            await UserController.getUser(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 404, "Data not found", {});
        });

        it("should return 200 with user data if user is found", async () => {
            const req = { params: { userId: "existingUserId" } };
            const res = {};
            const user = { id: "existingUserId", name: "John Doe" };

            (UserService.getUserById as jest.Mock).mockResolvedValue(user);

            await UserController.getUser(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 200, "Data fetched successfully", user);
        });

        it("should return 500 for internal server error", async () => {
            const req = { params: { userId: "existingUserId" } };
            const res = {};

            (UserService.getUserById as jest.Mock).mockRejectedValue(new Error("Internal Server Error"));

            await UserController.getUser(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 500, "Internal Server Error", {});
        });
    });
});
