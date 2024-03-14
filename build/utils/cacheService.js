"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.cachedData = exports.getCachedData = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default();
const defaultTTL = () => {
    return 24 * 60 * 60;
};
const getCachedData = (cacheKey) => {
    try {
        const cachedData = cache.get(cacheKey);
        return {
            success: true,
            data: cachedData !== undefined ? cachedData : null,
        };
    }
    catch (error) {
        console.error("Error occurred while getting cached data:", error);
        return {
            success: false,
            message: "Error occurred while getting cached data",
        };
    }
};
exports.getCachedData = getCachedData;
const cachedData = (cacheKey, data, TTLSeconds = defaultTTL()) => {
    try {
        cache.set(cacheKey, data, TTLSeconds);
        return {
            success: true,
            message: "Data caching successful"
        };
    }
    catch (error) {
        console.error("Error occurred while caching data:", error);
        return {
            success: false,
            message: "Error occurred while caching data"
        };
    }
};
exports.cachedData = cachedData;
const clearCache = (cacheKey) => {
    try {
        if (cacheKey) {
            cache.del(cacheKey);
        }
        else {
            cache.flushAll();
        }
        return {
            success: true,
            message: "Cached data successfully cleared"
        };
    }
    catch (error) {
        console.error("Error occurred while clearing cache:", error);
        return {
            success: false,
            message: "Error occurred while clearing cache"
        };
    }
};
exports.clearCache = clearCache;
