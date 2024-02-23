import { Request, Response, NextFunction } from "express";
import axios from "axios";

const removeSpaces = (str: String): string => {
  return str.replace(/\s/g, "");
};

const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api";

const getNigeriaStates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await axios.get(`${Nigeria_Info_Api}/states`);
    res.status(200).json({
      success: true,
      result: response.data
    });
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
    const response = await axios.get(`${Nigeria_Info_Api}/states`);
    const states = response.data;

    const state = states.find(
      (state: any) =>
        state.state_code.toUpperCase() === state_code.toUpperCase()
    );

    if (!state) {
      res.status(404).json({
        success: false,
        message: `State with code ${state_code} not found`,
      });
      return;
    }
    res.json({
      success: true,
      result: state
    });
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

  state_name = removeSpaces(state_name);

  try {
    const response = await axios.get(`${Nigeria_Info_Api}/all`);
    const states = response.data;

    const state = states.find((state: any) => {
      const nameWithoutSpaces = removeSpaces(state.name);
      return nameWithoutSpaces.toUpperCase() === state_name.toUpperCase();
    });

    if (!state) {
      res.status(404).json({
        success: false,
        message: `No State found with name ${state_name}`,
      });
      return;
    }
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
    res.json({
      success: true,
      result: stateData
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
