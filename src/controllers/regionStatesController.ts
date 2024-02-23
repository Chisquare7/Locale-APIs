import { Request, Response, NextFunction } from "express";
import regionStateModel, {regionStateDocument} from "../models/regionStates";

const getAllRegion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const regions = await regionStateModel.find().lean();
        res.status(200).json({
            success: true,
            result: regions
        })
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
        const region: regionStateDocument | null = await regionStateModel.findOne({"region.region_code": regionCode}).exec();

        if (!region) {
            res.status(404).json({
                success: false,
                message: `Region with ${regionCode} not found, please try again`
            })
            return;
        }
        res.status(200).json({
            success: true,
            result: region
        })
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
