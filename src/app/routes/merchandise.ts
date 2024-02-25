import { Router } from 'express';
import {isAuthenticated} from "../middlewares/isAuthenticated";
import {MerchandiseController} from "../controllers/merchandiseController";

const merchandise = Router()

merchandise.get('/',  [isAuthenticated], MerchandiseController.getAllMerchandise)
merchandise.get('/:productId', [isAuthenticated], MerchandiseController.getMerchandiseById)
merchandise.post('/', [isAuthenticated], MerchandiseController.createMerchandise)
merchandise.put('/:productId', [isAuthenticated], MerchandiseController.updateMerchandise)
merchandise.delete('/:productId', [isAuthenticated], MerchandiseController.deleteMerchandise)

export default merchandise;