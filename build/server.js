"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("./config/mongoose");
const authnRoutes_1 = __importDefault(require("./routes/authnRoutes"));
const allStatesRoutes_1 = __importDefault(require("./routes/allStatesRoutes"));
const stateLgaRoutes_1 = __importDefault(require("./routes/stateLgaRoutes"));
const stateTownsRoutes_1 = __importDefault(require("./routes/stateTownsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const regionStatesRoutes_1 = __importDefault(require("./routes/regionStatesRoutes"));
const allNigeriaLGAs_1 = __importDefault(require("./routes/allNigeriaLGAs"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const rateLimitMiddleware_1 = __importDefault(require("./middlewares/rateLimitMiddleware"));
const app = (0, express_1.default)();
(0, mongoose_1.databaseConnect)();
const limiter = (0, rateLimitMiddleware_1.default)();
// APIs Routes
app.use(express_1.default.json());
app.use(limiter);
app.use("/users", userRoutes_1.default);
app.use("/auth-apiKey", authnRoutes_1.default);
app.use("/states", allStatesRoutes_1.default);
app.use("/one-state", allStatesRoutes_1.default);
app.use("/state-lgas", allStatesRoutes_1.default);
app.use("/lgas", stateLgaRoutes_1.default);
app.use("/towns", stateTownsRoutes_1.default);
app.use("/regions", regionStatesRoutes_1.default);
app.use("/one-region", regionStatesRoutes_1.default);
app.use("/nigeria-lgas", allNigeriaLGAs_1.default);
//Error Handling middleware
app.use(globalErrorHandler_1.default);
exports.default = app;
