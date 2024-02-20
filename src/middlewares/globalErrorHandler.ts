import {Request, Response, NextFunction} from "express";

const globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Oops! An error occurred, Please try again:", error);
    res.status(500).json({message: "Internal Server Error"});
}

export default globalErrorHandler;