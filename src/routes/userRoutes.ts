import express, { Router } from "express";
import { createUser} from "../controllers/userController";

const userRouter: Router = express.Router();

userRouter.post("/", createUser);

export default userRouter;