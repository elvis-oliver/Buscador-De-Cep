import { FiSearch } from "react-icons/fi";
import "./styles.css";
import { useState } from "react";
import api from "./Services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha o CEP!");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      alert("Erro ao buscar, tenta novamente!");
      setInput("");
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>
            {" "}
            {cep.cep ? "CEP: " : ""} {cep.cep}{" "}
          </h2>
          <span>
            {" "}
            {cep.logradouro ? "Rua: " : ""} {cep.logradouro}{" "}
          </span>
          <span>
            {" "}
            {cep.complemento ? "Complemento: " : ""} {cep.complemento}{" "}
          </span>
          <span>
            {" "}
            {cep.bairro ? "Bairro: " : ""} {cep.bairro}{" "}
          </span>
          <span>
            {" "}
            {cep.localidade ? "Cidade: " : ""} {cep.localidade}{" "}
          </span>
          <span>
            {" "}
            {cep.uf ? "Estado/UF: " : ""} {cep.uf}{" "}
          </span>
          <span>
            {" "}
            {cep.ddd ? "DDD: " : ""} {cep.ddd}{" "}
          </span>
        </main>
      )}
      ;
    </div>
  );
}

export default App;
