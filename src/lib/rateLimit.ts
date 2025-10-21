import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Jika tidak menggunakan Upstash, bisa gunakan in-memory rate limiter sederhana
export const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 request per menit
  analytics: true,
});

// Alternative: Simple in-memory rate limiter (untuk development)
const ipRequestMap = new Map<string, { count: number; timestamp: number }>();

export function simpleRateLimit(ip: string, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const record = ipRequestMap.get(ip);
  
  if (!record || now - record.timestamp > windowMs) {
    ipRequestMap.set(ip, { count: 1, timestamp: now });
    return { success: true, remaining: limit - 1 };
  }
  
  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }
  
  record.count++;
  return { success: true, remaining: limit - record.count };
}
