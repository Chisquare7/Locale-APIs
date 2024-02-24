import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { cachedData, getCachedData } from "../utils/cacheService"

const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api/all";

const getStateTowns = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { state_code } = req.params;
  if (!state_code) {
    return next (new Error("state_code is required for this process"));
  }
  try {
    const cachedStateTowns = getCachedData(`stateTowns_${state_code}`);

    if (cachedStateTowns.success && cachedStateTowns.data) {
      const state = (cachedStateTowns.data as any[]).find((state:any) => state.state_code.toUpperCase() === state_code.toUpperCase())
      if (state) {
        res.status(200).json({
          success: true,
          message: "Cached data for state towns retrieved successfully",
          data: state.towns,
        });
        return;
      }
    }
    const response = await axios.get(Nigeria_Info_Api);
    const data = response.data;

    const state = data.find((state: any) => state && state.state_code.toUpperCase() === state_code.toUpperCase())
    if (!state) {
      res.status(404).json({
        success: false,
        message: `No state found for state code ${state_code}`
      })
      return;
    }

    const stateTowns = state.towns;
    cachedData(`stateTowns_${state_code}`, data);

    res.json({
      success: true,
      result: stateTowns
    })
    return;
  } catch (error) {
    console.error(
      `Error encountered when fetching towns in ${state_code}:`,
      error
    );
    next (new Error(
      `Oops! Failed to fetch specific state towns with ${state_code} from External APIs`
    ));
  }
  return Promise.resolve()
};

export { getStateTowns };
