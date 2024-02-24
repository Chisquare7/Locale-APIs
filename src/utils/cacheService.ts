import NodeCache from "node-cache";

const cache = new NodeCache();

const defaultTTL = (): number => {
    return 24 * 60 * 60;
}

const getCachedData = (cacheKey: string) => {
    try {
        const cachedData = cache.get(cacheKey);
        return {
          success: true,
          data: cachedData !== undefined ? cachedData : null,
        };
    } catch (error) {
        console.error("Error occurred while getting cached data:", error);
        return {
          success: false,
          message: "Error occurred while getting cached data",
        };
    }
}

const cachedData = (cacheKey: string, data: any, TTLSeconds: number = defaultTTL()) => {
    try {
        cache.set(cacheKey, data, TTLSeconds);
        return {
            success: true,
            message: "Data caching successful"
        }
    } catch (error) {
        console.error("Error occurred while caching data:", error)
        return {
            success: false,
            message: "Error occurred while caching data"
        }
    }
}

const clearCache = (cacheKey?: string) => {
    try {
        if (cacheKey) {
            cache.del(cacheKey);
        } else {
            cache.flushAll();
        }
        return {
            success: true,
            message: "Cached data successfully cleared"
        }
    } catch (error) {
        console.error("Error occurred while clearing cache:", error)
        return {
            success: false,
            message: "Error occurred while clearing cache"
        }
    }
}

export {getCachedData, cachedData, clearCache}