"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const regionStatesController_1 = require("../controllers/regionStatesController");
const authnMiddleware_1 = require("../middlewares/authnMiddleware");
const regionStatesRouter = express_1.default.Router();
regionStatesRouter.get('/all', authnMiddleware_1.authenticateApiKey, regionStatesController_1.getAllRegion);
regionStatesRouter.get('/code/:region_code', authnMiddleware_1.authenticateApiKey, regionStatesController_1.searchSpecificRegion);
exports.default = regionStatesRouter;
