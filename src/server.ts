import express from 'express'
import authRouter from './routes/auth.routes.js'
import { prisma } from './config/config.js'
import { RoomManager } from './roomManager/roomManger.js'

const app = express()
const roomManager = new RoomManager()

app.use(express.json())

app.post('/joinRoom', (req, res) => {
  const { code } = req.body as { code?: unknown }

  if (typeof code !== 'string') {
    return res.status(400).json({
      message: 'code is required',
    })
  }

  return res.status(501).json({
    message: `joinRoom is not implemented yet for code ${code}`,
  })
})

app.get('/startRoom', async (req, res) => {
  try {
    const queryUserId = typeof req.query.userId === 'string' ? req.query.userId : undefined

    if (!queryUserId) {
      return res.status(400).json({
        message: 'userId is required',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        userId: queryUserId,
      },
    })

    if (!user) {
      return res.status(404).json({
        message: 'no user found to start a room',
      })
    }

    const { roomId } = await roomManager.startRoom(user.userId)

    return res.json({
      message: 'room started successfully',
      roomId,
      userId: user.userId,
    })
  } catch (error) {
    console.log('error making room', error)
    return res.status(500).json({
      message: 'could not start the room',
    })
  }
})

app.use('/api/auth', authRouter)

app.listen(3000)
