import type { PlayerState } from '../types/types.js'
import { SocketServer } from '../lib/websocket.js'
import { generateRandomString } from '../utils/generateString.js'
import { prisma } from '../config/config.js'

export class RoomManager {
  private readonly roomDetails: Map<string, PlayerState>

  constructor() {
    this.roomDetails = new Map()
  }

  public async startRoom(userId: string): Promise<{ roomId: string }> {
    SocketServer.getInstance(8080).registerHandlers()
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const data: PlayerState = {
      userId,
      name: user.userName,
      score: 0,
      connected: true,
      hasGuessedCorrectly: false,
      isDrawer: false,
    }
    const roomId = generateRandomString()

    this.roomDetails.set(roomId, data)
    return {
      roomId,
    }
  }

  public joinRoom(_roomId: string): void {}
}
