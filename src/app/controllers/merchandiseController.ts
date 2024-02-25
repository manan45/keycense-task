import { ResponseBuilder } from "../utils/ResponseBuilder";
import { MerchandiseService } from "../services/MerchandiseService";

export class MerchandiseController {
    static async getAllMerchandise(req, res) {
        try {
            let { sortBy, limit, offset, sortOrder, search } = req.query;
            if (!limit) {
                limit = 10;
            }
            if (!offset) {
                offset = 0;
            }
            if (sortBy && (sortBy !== 'name' && sortBy !== 'price')) {
                return ResponseBuilder.send(res, 400, 'Invalid sortBy parameter', []);
            }
            if (sortOrder && (sortOrder !== 'asc' && sortOrder !== 'desc')) {
                return ResponseBuilder.send(res, 400, 'Invalid sortOrder parameter', []);
            }
            if (!sortOrder) {
                sortOrder = 'asc';
            }
            if (!sortBy) {
                sortBy = 'price';
            }
            if (!search) {
                search = '';
            }
            const merchandise = await MerchandiseService.getAllMerchandise({
                limit: parseInt(limit), offset: parseInt(offset), sortBy, sortOrder, search
            });
            return ResponseBuilder.send(res, 200, 'Data fetched successfully', merchandise, );
        } catch (e) {
            console.error(e);
            return ResponseBuilder.send(res, 500, 'Internal Server Error', []);
        }
    }

    static async getMerchandiseById(req, res) {
        try {
            const { productId } = req.params;
            if (!productId) {
                return ResponseBuilder.send(res, 400, 'Product id is required', []);
            }
            const merchandise = await MerchandiseService.getMerchandiseById(productId);
            if (merchandise) {
                return ResponseBuilder.send(res, 200, 'Data fetched successfully', merchandise);
            }
            return ResponseBuilder.send(res, 404,  'Data not found', []);
        } catch (e) {
            console.error(e);
            return ResponseBuilder.send(res, 500, 'Internal Server Error', []);
        }
    }

    static async createMerchandise(req, res) {
        try {
            const { name, price, productId } = req.body;
            if (!name || !price || !productId) {
                return ResponseBuilder.send(res, 400, 'Name , price and productId are required', []);
            }
            // check if product id exists
            const merchandiseExists = await MerchandiseService.getMerchandiseById(productId);
            if (merchandiseExists) {
                return ResponseBuilder.send(res, 400, 'Product id already exists', []);
            }
            const merchandise = await MerchandiseService.createMerchandise({ name, price, productId });
            return ResponseBuilder.send(res, 201, 'Data created successfully', merchandise);
        } catch (e) {
            console.error(e);
            return ResponseBuilder.send(res, 500, 'Internal Server Error', []);
        }
    }

    static async updateMerchandise(req, res) {
        try {
            const { name, price } = req.body;
            const { productId } = req.params;
            if (!name || !price) {
                return ResponseBuilder.send(res, 400, 'Name and price are required', []);
            }
            // check if product id is valid
            const merchandiseExists = await MerchandiseService.getMerchandiseById(productId);
            if (!merchandiseExists) {
                return ResponseBuilder.send(res, 404, 'Product id not found', []);
            }
            const merchandise = await MerchandiseService.updateMerchandise(productId, { name, price });
            if (merchandise) {
                return ResponseBuilder.send(res, 200, 'Data updated successfully', merchandise);
            }
            return ResponseBuilder.send(res, 404, [], 'Data not found');
        } catch (e) {
            console.error(e);
            return ResponseBuilder.send(res, 500, 'Internal Server Error', []);
        }
    }

    static async deleteMerchandise(req, res) {
        try {
            const { productId } = req.params;
            if (!productId) {
                return ResponseBuilder.send(res, 400, 'Product id is required', []);
            }
            // check if product id is valid
            const merchandiseExists = await MerchandiseService.getMerchandiseById(productId);
            if (!merchandiseExists) {
                return ResponseBuilder.send(res, 404, 'Product id not found', []);
            }
            const deleted = await MerchandiseService.deleteMerchandise(productId);
            if (deleted) {
                return ResponseBuilder.send(res, 200, 'Data deleted successfully', []);
            }
            return ResponseBuilder.send(res, 500, 'Internal Server Error', []);
        } catch (e) {
            console.error(e);
            return ResponseBuilder.send(res, 500, 'Internal Server Error', []);
        }
    }
}
