import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Nav/nav.tsx";
import Home from "./pages/home/Home.tsx";
import Autencicacao from "./pages/autenticacao/Autenticacao.tsx";
import Comandos from "./pages/comandos/Comandos.tsx";
import Resgatar from "./pages/resgatar/Resgatar.tsx";
import Doacao from "./pages/doar/doacao.tsx";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/autenticacao" element={<Autencicacao />} />
            <Route path="/comandos" element={<Comandos />} />
            <Route path="/resgatar" element={<Resgatar />} />
            <Route path="/doar" element={<Doacao />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
