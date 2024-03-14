import express, { Router } from "express";
import { getAllNigeriaLGAs} from "../controllers/allNigerialgasController";
import { authenticateApiKey } from "../middlewares/authnMiddleware";

const allLGAsRouter: Router = express.Router();

allLGAsRouter.get("/all", authenticateApiKey, getAllNigeriaLGAs);

export default allLGAsRouter;