import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: {
      userId: 'test-user-1',
    },
    update: {
      userName: 'tester@example.com',
      password: 'password123',
    },
    create: {
      userId: 'test-user-1',
      userName: 'tester@example.com',
      password: 'password123',
      email:"abc@abc.com"
    },
  })

  const room = await prisma.room.upsert({
    where: {
      code: 'ROOM01',
    },
    update: {},
    create: {
      roomId: 'test-room-1',
      code: 'ROOM01',
    },
  })

  console.log('Seeded user:', user.userId)
  console.log('Seeded room:', room.roomId)
}

main()
  .catch((error) => {
    console.error('Seed failed', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
