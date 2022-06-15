import dotenv from 'dotenv'
dotenv.config({ override: true });

export default {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'admin',
    MONGO_USER: process.env.MONGO_USER ||  'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD ||  'admin',
    MONGO_HOST: process.env.MONGO_HOST ||  'localhost',
    MONGO_CONFIGURATION: process.env.MONGO_CONFIGURATION || 'security-app',
    PORT: process.env.PORT || 3001,
    SENDGRID:process.env.SENDGRID
}