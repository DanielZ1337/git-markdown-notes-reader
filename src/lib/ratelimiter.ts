import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

/* taken from source code */
type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

export function createRateLimiter(redisClient: Redis, limit: number, windowTime: Duration) {
    const limiter = Ratelimit.slidingWindow(limit, windowTime);
    return new Ratelimit({
        redis: redisClient,
        limiter: limiter,
    });
}