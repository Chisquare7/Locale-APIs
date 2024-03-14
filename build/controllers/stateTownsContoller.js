"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateTowns = void 0;
const axios_1 = __importDefault(require("axios"));
const cacheService_1 = require("../utils/cacheService");
const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api/all";
const getStateTowns = async (req, res, next) => {
    const { state_code } = req.params;
    if (!state_code) {
        return next(new Error("state_code is required for this process"));
    }
    try {
        const cachedStateTowns = (0, cacheService_1.getCachedData)(`stateTowns_${state_code}`);
        if (cachedStateTowns.success && cachedStateTowns.data) {
            const state = cachedStateTowns.data.find((state) => state.state_code.toUpperCase() === state_code.toUpperCase());
            if (state) {
                res.status(200).json({
                    success: true,
                    message: "Cached data for state towns retrieved successfully",
                    data: state.towns,
                });
                return;
            }
        }
        const response = await axios_1.default.get(Nigeria_Info_Api);
        const data = response.data;
        const state = data.find((state) => state && state.state_code.toUpperCase() === state_code.toUpperCase());
        if (!state) {
            res.status(404).json({
                success: false,
                message: `No state found for state code ${state_code}`
            });
            return;
        }
        const stateTowns = state.towns;
        (0, cacheService_1.cachedData)(`stateTowns_${state_code}`, data);
        res.json({
            success: true,
            result: stateTowns
        });
        return;
    }
    catch (error) {
        console.error(`Error encountered when fetching towns in ${state_code}:`, error);
        next(new Error(`Oops! Failed to fetch specific state towns with ${state_code} from External APIs`));
    }
    return Promise.resolve();
};
exports.getStateTowns = getStateTowns;
