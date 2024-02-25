import { MerchandiseController } from './merchandiseController';
import { ResponseBuilder } from '../utils/ResponseBuilder'
import { MerchandiseService } from '../services/MerchandiseService';

jest.mock('../services/MerchandiseService');
jest.mock('../utils/ResponseBuilder');

describe('MerchandiseController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllMerchandise', () => {
        it('should return merchandise data with valid parameters', async () => {
            const req = { query: { sortBy: 'name', limit: 10, offset: 0, sortOrder: 'asc', search: 'example' } };
            const res = {};

            const merchandiseData = [{ id: 1, name: 'Example Product', price: 10 }];
            (MerchandiseService.getAllMerchandise as jest.Mock).mockResolvedValue(merchandiseData);

            await MerchandiseController.getAllMerchandise(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 200, 'Data fetched successfully', merchandiseData);
        });

        it('should return error with invalid sortBy parameter', async () => {
            const req = { query: { sortBy: 'invalid', limit: 10, offset: 0, sortOrder: 'asc', search: 'example' } };
            const res = {};

            await MerchandiseController.getAllMerchandise(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 400, 'Invalid sortBy parameter', []);
        });

        // Add more test cases for other scenarios
    });

    describe('getMerchandiseById', () => {
        it('should return merchandise data with valid product id', async () => {
            const req = { params: { productId: 'validId' } };
            const res = {};

            const merchandiseData = { id: 'validId', name: 'Example Product', price: 10 };
            (MerchandiseService.getMerchandiseById as jest.Mock).mockResolvedValue(merchandiseData);

            await MerchandiseController.getMerchandiseById(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 200, 'Data fetched successfully', merchandiseData);
        });

        it('should return error with missing product id', async () => {
            const req = { params: {} };
            const res = {};

            await MerchandiseController.getMerchandiseById(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 400, 'Product id is required', []);
        });

        // Add more test cases for other scenarios
    });

    describe('createMerchandise', () => {
        it('should create merchandise with valid data', async () => {
            const req = { body: { name: 'New Product', price: 20, productId: 'newProductId' } };
            const res = {};

            (MerchandiseService.getMerchandiseById as jest.Mock).mockResolvedValue(null);
            const createdMerchandise = { id: 'newProductId', name: 'New Product', price: 20 };
            (MerchandiseService.createMerchandise as jest.Mock).mockResolvedValue(createdMerchandise);

            await MerchandiseController.createMerchandise(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 201, 'Data created successfully', createdMerchandise);
        });

        it('should return error with missing parameters', async () => {
            const req = { body: {} };
            const res = {};

            await MerchandiseController.createMerchandise(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 400, 'Name , price and productId are required', []);
        });

        // Add more test cases for other scenarios
    });

    describe('updateMerchandise', () => {
        it('should update merchandise with valid data and product id', async () => {
            const req = { params: { productId: 'existingId' }, body: { name: 'Updated Product', price: 25 } };
            const res = {};

            const existingMerchandise = { id: 'existingId', name: 'Existing Product', price: 20 };
            (MerchandiseService.getMerchandiseById as jest.Mock).mockResolvedValue(existingMerchandise);
            const updatedMerchandise = { id: 'existingId', name: 'Updated Product', price: 25 };
            (MerchandiseService.updateMerchandise as jest.Mock).mockResolvedValue(updatedMerchandise);

            await MerchandiseController.updateMerchandise(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 200, 'Data updated successfully', updatedMerchandise);
        });

        it('should return error with missing parameters', async () => {
            const req = { params: { productId: 'existingId' }, body: {} };
            const res = {};

            await MerchandiseController.updateMerchandise(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 400, 'Name and price are required', []);
        });

        // Add more test cases for other scenarios
    });

    describe('deleteMerchandise', () => {
        it('should delete merchandise with valid product id', async () => {
            const req = { params: { productId: 'existingId' } };
            const res = {};

            const existingMerchandise = { id: 'existingId', name: 'Existing Product', price: 20 };
            (MerchandiseService.getMerchandiseById as jest.Mock).mockResolvedValue(existingMerchandise);
            (MerchandiseService.deleteMerchandise as jest.Mock).mockResolvedValue(true);

            await MerchandiseController.deleteMerchandise(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 200, 'Data deleted successfully', []);
        });

        it('should return error with missing product id', async () => {
            const req = { params: {} };
            const res = {};

            await MerchandiseController.deleteMerchandise(req, res);

            expect(ResponseBuilder.send).toHaveBeenCalledWith(res, 400, 'Product id is required', []);
        });

        // Add more test cases for other scenarios
    });
});
