import { PrismaClient } from '@prisma/client';

/**
 * PrismaClient singleton pattern for serverless environments
 * Prevents connection exhaustion and reuses connections across requests
 * 
 * Reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-constructor#max-connections-pool-size
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
