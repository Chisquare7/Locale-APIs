import { NextFunction, Request, Response } from "express";
import axios from "axios";

const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api/all";

const getStateLGAs = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  const { state_code } = req.params;
    if (!state_code) {
      return next(new Error("state_code is required for this process"));
    }
  try {
    const response = await axios.get(Nigeria_Info_Api);
    const data = response.data;
    const state = data.find((state: any) => state.state_code === state_code);
    if (!state) {
      res.status(404).json({message: `No state found for state code ${state_code}`})
      return;
    }
    res.json(state.lgas);
  } catch (error) {
    console.error(`Error encountered when fetching LGAs in ${state_code}:`, error);
    next (new Error("Oops! Failed to fetch specific state LGAs from External APIs"));
  }
  return Promise.resolve();
};

export { getStateLGAs };
