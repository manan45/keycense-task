import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    userId: number;
    accessToken: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    userId: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// UserSchema.pre('save', function(next) {
//     this.updatedAt = new Date();
//     next();
// });

export default mongoose.model<IUser>('User', UserSchema);

