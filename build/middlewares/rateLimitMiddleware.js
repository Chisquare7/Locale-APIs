"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rateLimiterService = () => {
    return (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        message: "Too many requests from this IP address, please try again later"
    });
};
exports.default = rateLimiterService;
