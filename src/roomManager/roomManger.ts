import type { PlayerState } from '../types/types.js'
import { SocketServer } from '../lib/websocket.js'
import { generateRandomString, generateRoomCode } from '../utils/generateString.js'
import { prisma } from '../config/config.js'

export class RoomManager {
  private readonly roomDetails: Map<string, PlayerState>

  constructor() {
    this.roomDetails = new Map()
  }

  public async startRoom(userId: string): Promise<{ roomId: string,code:string }> {
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
    const code=generateRoomCode()
    const roomCreate=await prisma.room.create({
        data:{
            roomId:roomId,
            code:code
        }
    })
    
    this.roomDetails.set(roomId, data)
    return {
      "roomId":roomId,
      "code":code
    }
  }

  public joinRoom(_roomId: string): void {}
}
