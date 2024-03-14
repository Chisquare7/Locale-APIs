"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateLGAs = void 0;
const axios_1 = __importDefault(require("axios"));
const cacheService_1 = require("../utils/cacheService");
const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api/all";
const getStateLGAs = async (req, res, next) => {
    const { state_code } = req.params;
    if (!state_code) {
        return next(new Error("state_code is required for this process"));
    }
    try {
        const cachedStateLGAs = (0, cacheService_1.getCachedData)(`stateLGAs_${state_code}`);
        if (cachedStateLGAs.success && cachedStateLGAs.data) {
            const state = cachedStateLGAs.data.find((state) => state.state_code.toUpperCase() === state_code.toUpperCase());
            if (state) {
                res.status(200).json({
                    success: true,
                    message: "Cached data for state LGAs retrieved successfully",
                    data: state.lgas,
                });
                return;
            }
        }
        const response = await axios_1.default.get(Nigeria_Info_Api);
        const data = response.data;
        const state = data.find((state) => state.state_code.toUpperCase() === state_code.toUpperCase());
        if (!state) {
            res.status(404).json({
                success: false,
                message: `No state found with state code ${state_code}`
            });
            return;
        }
        const stateLGAs = state.lgas;
        (0, cacheService_1.cachedData)(`stateLGAs_${state_code}`, data);
        res.json({
            success: true,
            result: stateLGAs,
        });
        return;
    }
    catch (error) {
        console.error(`Error encountered when fetching LGAs in ${state_code}:`, error);
        next(new Error(`Oops! Failed to fetch specific state LGAs with ${state_code} from External APIs`));
    }
    return Promise.resolve();
};
exports.getStateLGAs = getStateLGAs;
