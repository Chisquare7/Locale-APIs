import { Request, Response } from "express";
import axios from "axios";

const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api";

const getStateTowns = async (req: Request, res: Response): Promise<void> => {
  const { state_code } = req.params;
  if (!state_code) {
    throw new Error("state_code is required for this process");
  }
  try {
    const response = await axios.get(`${Nigeria_Info_Api}/${state_code}/towns`);
    return response.data.towns;
  } catch (error) {
    console.error(
      `Error encountered when fetching towns in ${state_code}:`,
      error
    );
    throw new Error(
      "Oops! Failed to fetch specific state towns from External APIs"
    );
  }
};

export { getStateTowns };
