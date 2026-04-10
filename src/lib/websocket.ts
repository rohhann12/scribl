import { WebSocketServer, type WebSocket } from 'ws'

interface SocketMessage {
  type?: string
  roomId:string
}

export class SocketServer {
  private static instance: SocketServer | null = null

  private readonly wss: WebSocketServer

  private constructor(port = 8080) {
    this.wss = new WebSocketServer({ port })
  }

  static getInstance(port = 8080): SocketServer {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer(port)
    }
    console.log("socket server joined")
    return SocketServer.instance
  }

  public registerHandlers(): void {
    this.wss.on('connection', (ws: WebSocket) => {
      ws.on('error', console.error)

      ws.on('message', (data: unknown) => {
        console.log('received: %s', data)
        const parsedData = this.parseMessage(data)

        if (parsedData?.type === 'JOIN_ROOM') {
          console.log("room joined with roomId",parsedData?.roomId)
          // Room join handling will be added here.
        } else if (parsedData?.type === 'SEND_MESSAGE') {
          // Message broadcast handling will be added here.
        }
      })
    })
  }

  private parseMessage(data: unknown): SocketMessage | null {
    if (typeof data !== 'string') {
      return null
    }

    try {
      return JSON.parse(data) as SocketMessage
    } catch {
      return null
    }
  }
}
