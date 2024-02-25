import * as mongoose from 'mongoose';
import Merchandise from "../models/Merchandise";
import Users from "../models/Users";
import * as path from "path";
import * as fs from "fs";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL as string, {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true, // Use the new topology engine
        });
        await importData();
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err);
        process.exit(1); // Exit process with failure
    }
};

const importData = async () => {
    // Read and import merchandise data
    console.log(path.join(__dirname, 'data/merchandise.json'))
    const merchandiseData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/merchandise.json'), 'utf-8'));
    await Merchandise.deleteMany({}); // Clear existing data
    await Merchandise.insertMany(merchandiseData);
    console.log('Merchandise data imported successfully.');

    // Read and import user data
    const userData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json'), 'utf-8'));
    await Users.deleteMany({}); // Clear existing data
    await Users.insertMany(userData);
    console.log('User data imported successfully.');
};

export default connectDB;
