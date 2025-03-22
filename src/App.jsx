import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Receitas from './paginas/Receitas'
import NavigationBar from './paginas/NavBar';
import Home from './paginas/Home';
import Historico from './paginas/Historico';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receitas" element={<Receitas />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>
      </Router>
    </>
  )
}

export default App
