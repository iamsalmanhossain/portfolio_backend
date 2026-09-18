import express, { Application, Request, Response } from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import router from "./app/routes/index.js";
import notFound from "./middleware/notFound.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

const createApp = () => {
    const app: Application = express();
    
    // Parsers
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    // app.use(rateLimit());

    // Application Routes
    app.use("/api/v1", router);

    // Root endpoint
    app.get("/", (req: Request, res: Response) => {
        res.send("Portfolio Backend API is running!");
    });

    // Not Found & Global Error Handler
    app.use(notFound);
    app.use(globalErrorHandler);

    return app;
};

export default createApp;
