import express, { Router } from "express";
import { getNigeriaStates, getSingleState, getStateWithLGAs } from "../controllers/allStatesController";
import { authenticateApiKey } from "../middlewares/authnMiddleware";

const statesRouter: Router = express.Router();

statesRouter.get("/", authenticateApiKey, getNigeriaStates);
statesRouter.get("/code/:state_code", authenticateApiKey, getSingleState);
statesRouter.get("/name/:state_name", authenticateApiKey, getStateWithLGAs);

export default statesRouter;
