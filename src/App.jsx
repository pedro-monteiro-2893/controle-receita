import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Receitas from './paginas/Receitas'
import NavigationBar from './paginas/NavBar';
import Home from './paginas/Home';
import Historico from './paginas/Historico';
import './App.css';
import Fonte from './paginas/Fonte';
import Relatorio from './paginas/Relatorio';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <NavigationBar />
      <Routes>
        <Route path="/controle-receita/" element={<Home />} />
        <Route path="/receitas" element={<Receitas />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/fonte" element={<Fonte />} />
        <Route path="/relatorio" element={<Relatorio/>} />
      </Routes>
      </Router>
    </>
  )
}

export default App
