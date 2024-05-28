import {BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import { Lobby } from "./pages/Lobby";
import { CodeEditor } from './pages/CodeEditor';
import { useEffect, useState } from 'react';
import { SOCKET_EVENT_IS_MENTOR, socketService } from './services/socket.service';

export function App() {
  const [isMentor, setIsMentor] = useState(false)

  useEffect(() => {
    socketService.on(SOCKET_EVENT_IS_MENTOR, ({ isMentor }) => {
      setIsMentor(isMentor)
    })

    return () => {
      socketService.off(SOCKET_EVENT_IS_MENTOR)
    }
  }, [])
  return (
    <Router>
      <section className="app">
        <main>
          <Routes>
          <Route element={<Lobby/>} path="/" />
          <Route element={<CodeEditor isMentor={isMentor}/>} path="/editor/:blockId" />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
