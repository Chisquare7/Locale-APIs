import {Request, Response} from "express";
import axios from "axios"

const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api";

const getNigeriaStates = async (req: Request, res: Response): Promise<void> => {
    try {
        // console.log(`Request URL: ${Nigeria_Info_Api}/states`);
        const response = await axios.get(`${Nigeria_Info_Api}/states`);
        // console.log(`Response status: ${response.status}`);
        // console.log(`Response data: ${JSON.stringify(response.data)}`);
        res.status(200).json(response.data)
    } catch (error) {
        console.error("Error encountered when fetching states:", error);
        throw new Error("Oops! Failed to fetch states from External APIs")
    }
}


export { getNigeriaStates };