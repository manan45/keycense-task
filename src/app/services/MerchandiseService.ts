import Merchandise from "../models/Merchandise";
import { IGetAllMerchandise, IMerchandise } from "../types/merchandise";

export class MerchandiseService {
    static async getAllMerchandise({
                                       limit,
                                       offset,
                                       sortBy,
                                       sortOrder,
                                       search
                                   }: IGetAllMerchandise): Promise<IMerchandise[]> {
        try {
            let searchQuery = {};
            if (search) {
                const regexPattern = `.*${search}.*`;
                const regex = new RegExp(regexPattern, 'i');
                searchQuery = {
                    name: {
                        $regex: regex
                    }
                };
            }
            const merchandise = await Merchandise.find(searchQuery)
                .limit(limit)
                .skip(offset)
                .sort({ [sortBy]: sortOrder })
                .select('productId name price createdAt updatedAt');

            return merchandise;
        } catch (error) {
            console.error("Error fetching merchandise:", error);
            throw error;
        }
    }

    static async getMerchandiseById(productId: number): Promise<IMerchandise | null> {
        try {
            const merchandise = await Merchandise.findOne({ productId })
                .select('productId name price createdAt updatedAt');
            return merchandise;
        } catch (error) {
            console.error("Error fetching merchandise by id:", error);
            throw error;
        }
    }

    static async createMerchandise(merchandise: IMerchandise): Promise<IMerchandise> {
        try {
            const newMerchandise = new Merchandise(merchandise);
            await newMerchandise.save();
            return newMerchandise;
        } catch (error) {
            console.error("Error creating merchandise:", error);
            throw error;
        }
    }

    static async updateMerchandise(productId: number, merchandise: IMerchandise): Promise<IMerchandise> {
        try {
            await Merchandise.updateOne({ productId }, { $set: merchandise, updatedAt: new Date() });
            return await this.getMerchandiseById(productId);
        } catch (error) {
            console.error("Error updating merchandise:", error);
            throw error;
        }
    }

    static async deleteMerchandise(productId: number): Promise<boolean> {
        try {
            await Merchandise.deleteOne({ productId });
            return true;
        } catch (error) {
            console.error("Error deleting merchandise:", error);
            throw error;
        }
    }
}
