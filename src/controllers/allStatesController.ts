import {NextFunction, Request, Response} from "express";
import axios from "axios"

const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api";

const getNigeriaStates = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(`${Nigeria_Info_Api}/states`);
        res.status(200).json(response.data)
    } catch (error) {
        console.error("Error encountered when fetching states:", error);
        throw new Error("Oops! Failed to fetch states from External APIs")
    }
}

const getSingleState = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {state_code} = req.params;

    if (!state_code) {
        res.status(400).json({message: "state_code is required for this process"})
        return
        // return next(new Error("state_code is required for this process"));
    }
    try {
        const response = await axios.get(`${Nigeria_Info_Api}/states`);
        const states = response.data;

        const state = states.find((state: any) => state.state_code === state_code.toUpperCase());

        if (!state) {
            res.status(404).json({message: `State with code ${state_code} not found`})
            return
        }
        res.json(state);
    } catch (error) {
        console.error(`Error encountered when fetching state ${state_code}:`, error);
        next(new Error(`Failed to fetch state ${state_code} from External APIs`))
    }
}


export { getNigeriaStates, getSingleState };