import express, { Router } from "express";
import { getStateTowns } from "../controllers/stateTownsContoller";
import { authenticateApiKey } from "../middlewares/authnMiddleware";

const stateTownRouter: Router = express.Router();

stateTownRouter.get("/", authenticateApiKey, getStateTowns);

export default stateTownRouter;