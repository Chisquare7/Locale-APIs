import express, { Express } from "express";
import dotenv from "dotenv";
import { databaseConnect } from "./config/mongoose"
import authnRoutes from "./routes/authnRoutes";
import statesRouter from "./routes/allStatesRoutes";
import stateLGAsRoutes from "./routes/stateLgaRoutes";
import stateTownRoutes from "./routes/stateTownsRoutes";
import userRoutes from "./routes/userRoutes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import regionStatesRoutes from "./routes/regionStatesRoutes";


dotenv.config();

const PORT = process.env.PORT;

const app: Express = express();

databaseConnect();

// APIs Routes
app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth-apiKey", authnRoutes);
app.use("/states", statesRouter);
app.use("/one-state", statesRouter);
app.use("/state-lgas", statesRouter);
app.use("/lgas", stateLGAsRoutes);
app.use("/towns", stateTownRoutes);
app.use("/region", regionStatesRoutes);
app.use("/one-region", regionStatesRoutes);


//Error Handling middleware
app.use(globalErrorHandler);





app.listen(PORT, () => {
  console.log(`server started running at: http://localhost:${PORT}`);
});