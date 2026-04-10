import { PrismaClient } from '@prisma/client'
import { createClient, type RedisClientType } from 'redis'

const connectionString = process.env.REDIS_URL || 'redis://localhost:6379'

export const redisClient: RedisClientType = createClient({
  url: connectionString,
  password: process.env.REDIS_PASSWORD || '',
})

export async function connectRedis(): Promise<void> {
  await redisClient.connect()
  console.log('Successfully connected to Redis')
}

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
