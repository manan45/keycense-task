import { Router } from 'express';
import {UserController} from "../controllers/userController";

const users = Router()

users.post('/token/refresh', UserController.refreshToken)
users.get('/:userId', UserController.getUser)

export default users;

