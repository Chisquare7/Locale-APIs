import express, { Router } from "express";
import { getStateLGAs } from "../controllers/stateLgaController";
import { authenticateApiKey } from "../middlewares/authnMiddleware";

const stateLGAsRouter: Router = express.Router();

stateLGAsRouter.get("/", authenticateApiKey, getStateLGAs);

export default stateLGAsRouter;