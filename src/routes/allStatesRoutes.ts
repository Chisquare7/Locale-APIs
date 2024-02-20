import express, { Router } from "express";
import { getNigeriaStates } from "../controllers/allStatesController";
import { authenticateApiKey } from "../middlewares/authnMiddleware";

const statesRouter: Router = express.Router();

statesRouter.get("/", authenticateApiKey, getNigeriaStates);

export default statesRouter;
