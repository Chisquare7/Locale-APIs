"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNigeriaLGAs = void 0;
const axios_1 = __importDefault(require("axios"));
const cacheService_1 = require("../utils/cacheService");
const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api";
const getAllNigeriaLGAs = async (req, res, next) => {
    try {
        const cachedAllLGAs = (0, cacheService_1.getCachedData)("nigeriaAllLGAs");
        if (cachedAllLGAs.success && cachedAllLGAs.data) {
            res.status(200).json({
                success: true,
                message: "Cached Data retrieved successfully",
                data: cachedAllLGAs.data
            });
        }
        else {
            const response = await axios_1.default.get(`${Nigeria_Info_Api}/all`);
            const data = response.data;
            const nigeriaLGAs = data.flatMap((state) => state.lgas.map((lga) => ({
                name: lga.name,
                location: lga.location,
                total_area: lga.total_area,
                postal_code: lga.postal_code,
                population: lga.population,
                creation_date: lga.creation_date,
            })));
            (0, cacheService_1.cachedData)("nigeriaAllLGAs", nigeriaLGAs);
            res.status(200).json({
                success: true,
                result: nigeriaLGAs,
            });
        }
    }
    catch (error) {
        console.error("Error encountered when fetching all LGAs in Nigeria:", error);
        next(new Error("Oops! Failed to fetch all Nigeria LGAs from External APIs"));
    }
    return Promise.resolve();
};
exports.getAllNigeriaLGAs = getAllNigeriaLGAs;
