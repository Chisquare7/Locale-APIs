"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authnControllers_1 = require("../controllers/authnControllers");
const authnRouter = express_1.default.Router();
authnRouter.post("/", authnControllers_1.generateApiKey);
exports.default = authnRouter;
