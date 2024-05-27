import { io } from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EMIT_SET_BOARD = 'set-board'
export const SOCKET_EVENT_BOARD_UPDATED = 'board-updated'
export const SOCKET_EMIT_UPDATE_BOARD = 'update-board'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

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
      const user = userService.getLoggedInUser()
      if (user) this.login(user._id)
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
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}