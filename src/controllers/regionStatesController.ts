import { Request, Response, NextFunction } from "express";
import regionStateModel, {regionStateDocument} from "../models/regionStates";
import { cachedData, getCachedData } from "../utils/cacheService"

const getAllRegion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cachedRegions = getCachedData("allRegions");
        if (cachedRegions.success && cachedRegions.data) {
            res.status(200).json({
                success: true,
                message: "Cached data for all regions retrieved successfully",
                data: cachedRegions.data
            });
            return;
        }
        const regions = await regionStateModel.find().lean();
        cachedData("allRegions", regions);
        res.status(200).json({
            success: true,
            result: regions
        });
        return;
    } catch (error) {
        console.error("Error encountered when fetching regions:", error);
        next(new Error("Oops! Failed to fetch all Nigeria regions from the database"))
    }
    return Promise.resolve();
};

const searchSpecificRegion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let regionCode: string = req.params.region_code;
    regionCode = regionCode.toUpperCase()

    try {
        const cachedSpecificRegion = getCachedData(`specificRegion_${regionCode}`)
        if (cachedSpecificRegion.success && cachedSpecificRegion.data) {
            res.status(200).json({
                success: true,
                message: "Cached data for specific region retrieved successfully",
                data: cachedSpecificRegion.data
            });
            return;
        }


        const region: regionStateDocument | null = await regionStateModel.findOne({"region.region_code": regionCode}).lean().exec();

        if (!region) {
            res.status(404).json({
                success: false,
                message: `Region with ${regionCode} not found, please try again`
            })
            return;
        }

        const cleanRegion = {
            name: region.region.name,
            region_code: region.region.region_code,
            population: region.region.population,
            total_area: region.region.total_area,
            states: region.region.states
        }

        cachedData(`specificRegion_${regionCode}`, cleanRegion);

        res.status(200).json({
          success: true,
          result: cleanRegion,
        });
    } catch (error) {
        console.error("Error encountered when fetching a specific region:", error);
        next(
          new Error(
            `Oops! Failed to fetch a specific region data with region code ${regionCode} from the database`
          )
        );
    }
    return Promise.resolve();
}

export { getAllRegion, searchSpecificRegion };
