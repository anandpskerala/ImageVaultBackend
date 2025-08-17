import "reflect-metadata";
import express, { type  Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "@/db/index.js";
import authRoutes from "@/routes/authRoutes.js";
import { config } from "@/config.js";
import uploadRoutes from "@/routes/uploadRoutes.js";

class App {
    private _app: Application;
    constructor() {
        this._app = express();
        this._setupMiddlewares();
        this._setupRoutes();
    }

    private _setupMiddlewares() {
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended: true}));
        this._app.use(cookieParser());
        this._app.use(cors({
            origin: [config.frontend],
            credentials: true
        }))
    }

    private _setupRoutes() {
        this._app.use("/api/auth", authRoutes);
        this._app.use("/api/upload", uploadRoutes);
    }

    public listen(port: number) {
        this._app.listen(port, () => {
            connectDB();
            console.log(`Server started on port : ${port}`);
        });
    }
}

export default App;