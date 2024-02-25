const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret';

class SeedData {

    static generateMerchandiseData(count) {
        const merchandise = [];
        for (let i = 1; i <= count; i++) {
            merchandise.push({
                productId: i,
                name: `Product ${i}`,
                price: parseFloat((Math.random() * 100 + 1).toFixed(2)),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        }
        return merchandise;
    }

    static generateToken(payload, expiresIn) {
        return jwt.sign(payload, SECRET_KEY, { expiresIn });
    }

    static generateUserData(count) {
        const users = [];
        for (let i = 1; i <= count; i++) {
            const userId = i;
            const accessToken = this.generateToken({ userId, name: `user${userId}` }, '48h'); // Expires in 48 hours
            const refreshToken = this.generateToken({ userId, name: `user${userId}` }, '7d'); // Longer expiry for refresh token, e.g., 7 days

            users.push({
                userId: userId,
                username: `user${userId}`,
                password: `password${userId}`,
                name: `User Name ${userId}`,
                accessToken,
                refreshToken

            });
        }
        return users;
    }


    static saveDataToFile(filename, data) {
        try {
            fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
            console.log(`${filename} has been created with ${data.length} records.`);
        } catch (err) {
            console.error(`Error writing ${filename}:`, err);
        }
    }


    static run(){

        const merchandiseData = this.generateMerchandiseData(100);
        const userData = this.generateUserData(10);

        console.log(path.join(__dirname, 'merchandise.json'))
        this.saveDataToFile(path.join(__dirname, 'data', 'merchandise.json'), merchandiseData);
        this.saveDataToFile(path.join(__dirname, 'data', 'users.json'), userData);
        process.exit(0)
    }
}


SeedData.run(); // run the data