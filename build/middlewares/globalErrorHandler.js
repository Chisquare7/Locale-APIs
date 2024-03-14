"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (error, req, res, next) => {
    console.error("Oops! An error occurred, Please try again:", error);
    res.status(500).json({
        success: false,
        message: error.message
    });
};
exports.default = globalErrorHandler;
