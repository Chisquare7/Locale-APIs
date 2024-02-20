import express, { Router } from "express";
import { getNigeriaStates, getSingleState } from "../controllers/allStatesController";
import { authenticateApiKey } from "../middlewares/authnMiddleware";

const statesRouter: Router = express.Router();

statesRouter.get("/", authenticateApiKey, getNigeriaStates);
statesRouter.get("/:state_code", authenticateApiKey, getSingleState);

export default statesRouter;
