import {BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import { CodeBlock } from "./pages/CodeBlock";
import { Lobby } from "./pages/Lobby";

export function App() {
  return (
    <Router>
      <section className="app">
        <main>
          <Routes>
          <Route element={<Lobby/>} path="/" />
          <Route element={<CodeBlock/>} path="/codeBlock" />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
