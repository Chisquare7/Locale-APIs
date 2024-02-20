import express, {Router} from "express"
import { generateApiKey } from "../controllers/authnControllers"

const authnRouter: Router = express.Router();

authnRouter.post("/", generateApiKey);

export default authnRouter;