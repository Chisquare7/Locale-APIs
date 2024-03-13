import express, { Express } from "express";
import { databaseConnect } from "./config/mongoose"
import authnRoutes from "./routes/authnRoutes";
import statesRouter from "./routes/allStatesRoutes";
import stateLGAsRoutes from "./routes/stateLgaRoutes";
import stateTownRoutes from "./routes/stateTownsRoutes";
import userRoutes from "./routes/userRoutes";
import regionStatesRoutes from "./routes/regionStatesRoutes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import rateLimiterService from "./middlewares/rateLimitMiddleware";


const app: Express = express();

databaseConnect();

const limiter = rateLimiterService();

// APIs Routes
app.use(express.json());
app.use(limiter);

app.use("/users", userRoutes);
app.use("/auth-apiKey", authnRoutes);
app.use("/states", statesRouter);
app.use("/one-state", statesRouter);
app.use("/state-lgas", statesRouter);
app.use("/lgas", stateLGAsRoutes);
app.use("/towns", stateTownRoutes);
app.use("/regions", regionStatesRoutes);
app.use("/one-region", regionStatesRoutes);


//Error Handling middleware
app.use(globalErrorHandler);


export default app