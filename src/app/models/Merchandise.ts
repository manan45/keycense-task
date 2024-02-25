import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

interface IMerchandise extends Document {
    productId: number;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

const MerchandiseSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productId: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


// // Middleware to handle the update of the updatedAt field on save
// MerchandiseSchema.pre('save', function(next) {
//     this.updatedAt = new Date();
//     next();
// });

export default mongoose.model<IMerchandise>('Merchandise', MerchandiseSchema);
