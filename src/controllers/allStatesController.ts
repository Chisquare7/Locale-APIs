import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { cachedData, getCachedData } from "../utils/cacheService"

const removeSpaces = (str: string): string => {
  return str.replace(/\s/g, "");
};

const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api";

const getNigeriaStates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cachedStates = getCachedData("nigeriaStates");
    if (cachedStates.success && cachedStates.data) {
      res.status(200).json({
        success: true,
        message: "Cached Data retrieved successfully",
        cachedData: cachedStates.data
      })
    } else {
      const response = await axios.get(`${Nigeria_Info_Api}/states`);
      const states = response.data;
      cachedData("nigeriaStates", states)
      res.status(200).json({
        success: true,
        result: states,
      });
    }
  } catch (error) {
    console.error("Error encountered when fetching all states:", error)
    next(new Error("Oops! Failed to fetch all Nigeria states from External APIs"));
  }
  return Promise.resolve();
};

const getSingleState = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { state_code } = req.params;

  if (!state_code) {
    res.status(400).json({
      success: false,
      message: "state_code is required for this process",
    });
    return;
  }
  try {
    const cachedSingleState = getCachedData("nigeriaSingleState");
    if (cachedSingleState.success && cachedSingleState.data) {
      const state = (cachedSingleState.data as any[]).find((state: any) => state.state_code.toUpperCase() === state_code.toUpperCase());
      if (state) {
        res.status(200).json({
          success: true,
          message: "Cached Data for a single state retrieved successfully",
          data: state
        })
      } else {
        res.status(404).json({
          success: false,
          message: `State with code ${state_code} not found`
        })
      }
    } else {
      const response = await axios.get(`${Nigeria_Info_Api}/states`);
      const states = response.data;

      const state = states.find(
        (state: any) =>
          state.state_code.toUpperCase() === state_code.toUpperCase()
      );

      if (state) {
        cachedData("nigeriaSingleState", states);
        res.status(200).json({
          success: true,
          result: state
        })
      } else {
        res.status(404).json({
          success: false,
          message: `State with code ${state_code} not found`
        })
      }
    }
  } catch (error) {
    console.error(
      `Error encountered when fetching state ${state_code}:`,
      error
    );
    next(new Error(`Failed to fetch state ${state_code} from External APIs`));
  }
  return Promise.resolve();
};

const getStateWithLGAs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let { state_name } = req.params;

  if (!state_name) {
    res.status(400).json({
      success: false,
      message: "state_name is required for this process",
    });
    return;
  }

  state_name = removeSpaces(state_name).toUpperCase();

  try {
    const cachedStateWithLGAs = getCachedData("nigeriaStateWithLGAs")
    if (cachedStateWithLGAs && cachedStateWithLGAs.success && cachedStateWithLGAs.data) {
      const state = (cachedStateWithLGAs.data as any[]).find((state: any) => {
        const nameWithoutSpaces = removeSpaces(state.name).toUpperCase();
        return nameWithoutSpaces === state_name;
      });
      if (state) {
        const {
          name,
          capital,
          state_code,
          creation_date,
          location,
          total_area,
          population,
          lgas,
        } = state;

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

    const response = await axios.get(`${Nigeria_Info_Api}/all`);
    const states = response.data;
    const state = states.find((state: any) => {
      const nameWithoutSpaces = removeSpaces(state.name).toUpperCase();
      return nameWithoutSpaces === state_name;
    });
    if (state) {
      cachedData("nigeriaStateWithLGAs", states);
      const {
        name,
        capital,
        state_code,
        creation_date,
        location,
        total_area,
        population,
        lgas,
      } = state;

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
      success: true,
      message: `No State found with name ${state_name}`,
    });

  } catch (error) {
    console.error(
      `Error encountered when fetching state ${state_name}:`,
      error
    );
    next(new Error(`Failed to fetch state with LGAs ${state_name} from External APIs`));
  }
  return Promise.resolve();
};

export { getNigeriaStates, getSingleState, getStateWithLGAs };
