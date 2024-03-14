"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const allStatesController_1 = require("../controllers/allStatesController");
const authnMiddleware_1 = require("../middlewares/authnMiddleware");
const statesRouter = express_1.default.Router();
statesRouter.get("/", authnMiddleware_1.authenticateApiKey, allStatesController_1.getNigeriaStates);
statesRouter.get("/code/:state_code", authnMiddleware_1.authenticateApiKey, allStatesController_1.getSingleState);
statesRouter.get("/name/:state_name", authnMiddleware_1.authenticateApiKey, allStatesController_1.getStateWithLGAs);
exports.default = statesRouter;
