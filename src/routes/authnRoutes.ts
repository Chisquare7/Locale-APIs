import express, {Router} from "express"
import { generateApiKeyController } from "../controllers/authnControllers"

const authnRouter: Router = express.Router();

authnRouter.post("/", generateApiKeyController);

export default authnRouter;