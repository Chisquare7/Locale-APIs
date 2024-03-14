import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { cachedData, getCachedData } from "../utils/cacheService";


const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api";

const getAllNigeriaLGAs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cachedAllLGAs = getCachedData("nigeriaAllLGAs");
    if (cachedAllLGAs.success && cachedAllLGAs.data) {
        res.status(200).json({
            success: true,
            message: "Cached Data retrieved successfully",
            data: cachedAllLGAs.data
        })
    } else {
        const response = await axios.get<any[]>(`${Nigeria_Info_Api}/all`);
        const data: any[] = response.data;
        const nigeriaLGAs: any[] = data.flatMap((state: any) =>
          state.lgas.map((lga: any) => ({
            name: lga.name,
            location: lga.location,
            total_area: lga.total_area,
            postal_code: lga.postal_code,
            population: lga.population,
            creation_date: lga.creation_date,
          }))
        );
        cachedData("nigeriaAllLGAs", nigeriaLGAs);
        res.status(200).json({
          success: true,
          result: nigeriaLGAs,
        });
    }
  } catch (error) {
    console.error("Error encountered when fetching all LGAs in Nigeria:", error)
    next(new Error("Oops! Failed to fetch all Nigeria LGAs from External APIs"));
  }
  return Promise.resolve();
};


export { getAllNigeriaLGAs };