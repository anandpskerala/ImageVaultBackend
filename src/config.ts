import dotenv from "dotenv";

dotenv.config();

export const config = {
    env: "production",
    port: Number(process.env.PORT) || 5000,
    db: process.env.MONGO_URI || "",
    jwt: process.env.JWT_TOKEN || '',
    frontend: process.env.FRONTEND_URL || '',
    cloudinary: {
        cloudName: process.env.CLOUD_NAME,
        apiKey: process.env.CLOUD_API_KEY,
        secret: process.env.CLOUD_SECRET
    },
    email: {
        host: process.env.EMAIL_HOST,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
}