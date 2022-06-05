import dotenv from 'dotenv'
dotenv.config({ override: true });

export default {
    MONGO_USER: process.env.MONGO_USER ||  'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD ||  'admin',
    MONGO_HOST: process.env.MONGO_HOST ||  'localhost',
    MONGO_CONFIG: process.env.MONGO_CONFIG || 'security-app',
    PORT: process.env.PORT || 3001
}