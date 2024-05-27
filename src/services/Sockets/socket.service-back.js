import { Server } from 'socket.io'
import { logger } from './logger.service.js'

var gIo = null

export const SOCKET_EVENT_SET_BOARD = 'set-board'
export const SOCKET_EVENT_UPDATE_BOARD = 'update-board'
export const SOCKET_EMIT_UPDATED_BOARD = 'board-updated'

export const socketService = {
  setupSocketAPI,
}

export function setupSocketAPI(server) {
  gIo = new Server(server, {
    cors: {
      origin: '*',
    },
  })

  gIo.on('connection', socket => {
    logger.info(`New connected socket[id:${socket.id}]`)
    socket.on('disconnect', socket => {
      logger.info(`socket disconnected [id:${socket.id}]`)
    })

    socket.on(SOCKET_EVENT_SET_BOARD, entity => {
      if (!entity) return
      if (socket.myEntity === entity) return

      if (socket.myEntity) {
        socket.leave(socket.myEntity)
        logger.info(`socket is leaving entity ${socket.myEntity} [id: ${socket.id}]`)
      }
      socket.join(entity._id)
      socket.myEntity = entity._id
    })

    socket.on(SOCKET_EVENT_UPDATE_BOARD, entity => {
      logger.info(`Entity updated from socket from socket [id:${socket.id}]`)
      socket.broadcast.to(socket.myEntity).emit(SOCKET_EMIT_UPDATED_BOARD, entity)
    })

    socket.on('set-user-socket', userId => {
      logger.info(`Setting socket.userId = ${userId} for socket [id: ${socket.id}]`)
      socket.userId = userId
    })

    socket.on('unset-user-socket', () => {
      logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
      delete socket.userId
    })
  })
}
