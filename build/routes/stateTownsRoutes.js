"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stateTownsContoller_1 = require("../controllers/stateTownsContoller");
const authnMiddleware_1 = require("../middlewares/authnMiddleware");
const stateTownRouter = express_1.default.Router();
stateTownRouter.get("/:state_code", authnMiddleware_1.authenticateApiKey, stateTownsContoller_1.getStateTowns);
exports.default = stateTownRouter;
