import rateLimit from "express-rate-limit";

const rateLimiterService = () => {
    return rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        message: "Too many requests from this IP address, please try again later"
    })
}

export default rateLimiterService;