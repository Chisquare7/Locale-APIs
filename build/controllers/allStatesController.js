"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateWithLGAs = exports.getSingleState = exports.getNigeriaStates = void 0;
const axios_1 = __importDefault(require("axios"));
const cacheService_1 = require("../utils/cacheService");
const removeSpaces = (str) => {
    return str.replace(/\s/g, "");
};
const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api";
const getNigeriaStates = async (req, res, next) => {
    try {
        const cachedStates = (0, cacheService_1.getCachedData)("nigeriaStates");
        if (cachedStates.success && cachedStates.data) {
            res.status(200).json({
                success: true,
                message: "Cached Data retrieved successfully",
                data: cachedStates.data
            });
        }
        else {
            const response = await axios_1.default.get(`${Nigeria_Info_Api}/states`);
            const states = response.data;
            (0, cacheService_1.cachedData)("nigeriaStates", states);
            res.status(200).json({
                success: true,
                result: states,
            });
        }
    }
    catch (error) {
        console.error("Error encountered when fetching all states:", error);
        next(new Error("Oops! Failed to fetch all Nigeria states from External APIs"));
    }
    return Promise.resolve();
};
exports.getNigeriaStates = getNigeriaStates;
const getSingleState = async (req, res, next) => {
    const { state_code } = req.params;
    if (!state_code) {
        res.status(404).json({
            success: false,
            message: "state_code is required for this process",
        });
        return;
    }
    try {
        const cachedSingleState = (0, cacheService_1.getCachedData)("nigeriaSingleState");
        if (cachedSingleState.success && cachedSingleState.data) {
            const state = cachedSingleState.data.find((state) => state.state_code.toUpperCase() === state_code.toUpperCase());
            if (state) {
                res.status(200).json({
                    success: true,
                    message: "Cached Data for a single state retrieved successfully",
                    data: state
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `State with code ${state_code} not found`
                });
            }
        }
        else {
            const response = await axios_1.default.get(`${Nigeria_Info_Api}/states`);
            const states = response.data;
            const state = states.find((state) => state.state_code.toUpperCase() === state_code.toUpperCase());
            if (state) {
                (0, cacheService_1.cachedData)("nigeriaSingleState", states);
                res.status(200).json({
                    success: true,
                    result: state
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `State with code ${state_code} not found`
                });
            }
        }
    }
    catch (error) {
        console.error(`Error encountered when fetching state ${state_code}:`, error);
        next(new Error(`Failed to fetch state ${state_code} from External APIs`));
    }
    return Promise.resolve();
};
exports.getSingleState = getSingleState;
const getStateWithLGAs = async (req, res, next) => {
    let { state_name } = req.params;
    if (!state_name) {
        res.status(404).json({
            success: false,
            message: "state_name is required for this process",
        });
        return;
    }
    state_name = removeSpaces(state_name).toUpperCase();
    try {
        const cachedStateWithLGAs = (0, cacheService_1.getCachedData)("nigeriaStateWithLGAs");
        if (cachedStateWithLGAs && cachedStateWithLGAs.success && cachedStateWithLGAs.data) {
            const state = cachedStateWithLGAs.data.find((state) => {
                const nameWithoutSpaces = removeSpaces(state.name).toUpperCase();
                return nameWithoutSpaces === state_name;
            });
            if (state) {
                const { name, capital, state_code, creation_date, location, total_area, population, lgas, } = state;
                const stateData = {
                    name,
                    capital,
                    state_code,
                    creation_date,
                    location,
                    total_area,
                    population,
                    lgas,
                };
                res.status(200).json({
                    success: true,
                    message: "Cached data for state with LGAs retrieved successfully",
                    data: stateData,
                });
                return;
            }
        }
        const response = await axios_1.default.get(`${Nigeria_Info_Api}/all`);
        const states = response.data;
        const state = states.find((state) => {
            const nameWithoutSpaces = removeSpaces(state.name).toUpperCase();
            return nameWithoutSpaces === state_name;
        });
        if (state) {
            (0, cacheService_1.cachedData)("nigeriaStateWithLGAs", states);
            const { name, capital, state_code, creation_date, location, total_area, population, lgas, } = state;
            const stateData = {
                name,
                capital,
                state_code,
                creation_date,
                location,
                total_area,
                population,
                lgas,
            };
            res.status(200).json({
                success: true,
                result: stateData
            });
            return;
        }
        res.status(404).json({
            success: false,
            message: `No State found with name ${state_name}`,
        });
    }
    catch (error) {
        console.error(`Error encountered when fetching state ${state_name}:`, error);
        next(new Error(`Failed to fetch state with LGAs ${state_name} from External APIs`));
    }
    return Promise.resolve();
};
exports.getStateWithLGAs = getStateWithLGAs;
