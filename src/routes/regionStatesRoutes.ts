import express, { Router } from "express";
import { getAllRegion, searchSpecificRegion } from "../controllers/regionStatesController";
import { authenticateApiKey } from "../middlewares/authnMiddleware";

const regionStatesRouter: Router = express.Router();


regionStatesRouter.get('/', authenticateApiKey, getAllRegion);
regionStatesRouter.get('/code/:region_code', authenticateApiKey, searchSpecificRegion);

export default regionStatesRouter