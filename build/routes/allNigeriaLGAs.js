"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const allNigerialgasController_1 = require("../controllers/allNigerialgasController");
const authnMiddleware_1 = require("../middlewares/authnMiddleware");
const allLGAsRouter = express_1.default.Router();
allLGAsRouter.get("/all", authnMiddleware_1.authenticateApiKey, allNigerialgasController_1.getAllNigeriaLGAs);
exports.default = allLGAsRouter;
