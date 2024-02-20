import axios from "axios";

const Nigeria_Info_Api = "https://nigeria-states-towns-lga.onrender.com/api";

const searchOneState = async (state_code: string): Promise<any> => {
    try {
        if (!state_code) {
            throw new Error("state_code is required for this process");
        }

        const response = await axios.get(`${Nigeria_Info_Api}/states`);
        const states = response.data.states;
        const state = states.find((state: any) => state.state_code === state_code);

        if (!state) {
            throw new Error(`State with state_code ${state_code} not found`)
        }

        return state
    } catch (error) {
        console.error("Error encountered when fetching state", error)
        throw new Error("Fetching state from External API failed")
    }
}

export { searchOneState };