import { io } from 'socket.io-client'

export const SOCKET_EMIT_SET_BLOCK = 'set-block'
export const SOCKET_EVENT_BLOCK_UPDATED = 'block-updated'
export const SOCKET_EMIT_UPDATE_BLOCK = 'update-block'
export const SOCKET_EMIT_LEAVE_BLOCK = 'leave-block'

export const SOCKET_EVENT_IS_MENTOR = 'is-mentor'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
export const socketService = createSocketService()

socketService.setup()
socketService.on('connection', () => {
  console.log('connected!')
})

function createSocketService() {
  var socket = null

  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}
