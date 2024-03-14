"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stateLgaController_1 = require("../controllers/stateLgaController");
const authnMiddleware_1 = require("../middlewares/authnMiddleware");
const stateLGAsRouter = express_1.default.Router();
stateLGAsRouter.get("/:state_code", authnMiddleware_1.authenticateApiKey, stateLgaController_1.getStateLGAs);
exports.default = stateLGAsRouter;
