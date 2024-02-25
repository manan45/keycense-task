export interface IGetAllMerchandise {
    limit: number;
    offset: number;
    search: string;
    sortBy: string;
    sortOrder: string;
}

export interface IMerchandise {
    productId?: number;
    name: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}