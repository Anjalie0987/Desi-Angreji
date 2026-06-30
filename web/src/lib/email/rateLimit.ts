import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Initialize Upstash Redis if env vars are present
const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null;

/**
 * Very basic rate limiting using Upstash Redis.
 * If Redis is not configured, allows requests to proceed.
 */
export async function checkRateLimit(ip: string): Promise<boolean> {
  if (!redis) {
    console.warn("Upstash Redis is not configured. Rate limiting is bypassed.");
    return true; // Bypass rate limiting if not configured
  }

  const key = `rate-limit:contact:${ip}`;
  const limit = 3;
  const windowInSeconds = 10 * 60; // 10 minutes

  try {
    const currentCount = await redis.incr(key);

    if (currentCount === 1) {
      // Set expiration on the first increment
      await redis.expire(key, windowInSeconds);
    }

    if (currentCount > limit) {
      return false; // Rate limit exceeded
    }

    return true;
  } catch (error) {
    console.error("Redis rate limit error:", error);
    // Allow request to proceed if Redis fails temporarily, or change to false if strict
    return true;
  }
}
