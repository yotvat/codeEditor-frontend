import {BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import { Lobby } from "./pages/Lobby";
import { CodeEditor } from './pages/CodeEditor';

export function App() {

  return (
    <Router>
      <section className="app">
        <main>
          <Routes>
          <Route element={<Lobby/>} path="/" />
          <Route element={<CodeEditor/>} path="/editor/:blockId" />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
