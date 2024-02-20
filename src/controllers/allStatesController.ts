import {Request, Response} from "express";
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


export { getNigeriaStates };