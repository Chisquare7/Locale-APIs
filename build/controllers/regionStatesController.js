"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSpecificRegion = exports.getAllRegion = void 0;
const regionStates_1 = __importDefault(require("../models/regionStates"));
const cacheService_1 = require("../utils/cacheService");
const getAllRegion = async (req, res, next) => {
    try {
        const cachedRegions = (0, cacheService_1.getCachedData)("allRegions");
        if (cachedRegions.success && cachedRegions.data) {
            res.status(200).json({
                success: true,
                message: "Cached data for all regions retrieved successfully",
                data: cachedRegions.data
            });
            return;
        }
        const regions = await regionStates_1.default.find().lean();
        (0, cacheService_1.cachedData)("allRegions", regions);
        res.status(200).json({
            success: true,
            result: regions
        });
        return;
    }
    catch (error) {
        console.error("Error encountered when fetching regions:", error);
        next(new Error("Oops! Failed to fetch all Nigeria regions from the database"));
    }
    return Promise.resolve();
};
exports.getAllRegion = getAllRegion;
const searchSpecificRegion = async (req, res, next) => {
    let regionCode = req.params.region_code;
    regionCode = regionCode.toUpperCase();
    try {
        const cachedSpecificRegion = (0, cacheService_1.getCachedData)(`specificRegion_${regionCode}`);
        if (cachedSpecificRegion.success && cachedSpecificRegion.data) {
            res.status(200).json({
                success: true,
                message: "Cached data for specific region retrieved successfully",
                data: cachedSpecificRegion.data
            });
            return;
        }
        const region = await regionStates_1.default.findOne({ "region.region_code": regionCode }).lean().exec();
        if (!region) {
            res.status(404).json({
                success: false,
                message: `Region with ${regionCode} not found, please try again`
            });
            return;
        }
        const cleanRegion = {
            name: region.region.name,
            region_code: region.region.region_code,
            population: region.region.population,
            total_area: region.region.total_area,
            states: region.region.states
        };
        (0, cacheService_1.cachedData)(`specificRegion_${regionCode}`, cleanRegion);
        res.status(200).json({
            success: true,
            result: cleanRegion,
        });
    }
    catch (error) {
        console.error("Error encountered when fetching a specific region:", error);
        next(new Error(`Oops! Failed to fetch a specific region data with region code ${regionCode} from the database`));
    }
    return Promise.resolve();
};
exports.searchSpecificRegion = searchSpecificRegion;
