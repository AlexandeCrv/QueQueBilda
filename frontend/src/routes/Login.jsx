import { useState, KeyboardEvent } from "react";
import { VscArrowRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { faztudo } from "../services/riot.service";
import "./login.css";

import axios from "axios";
import logo from "../assets/QQB.png";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const enter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(name, tag);
    }
  };
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const isFormValid = name.trim() !== "" && tag.trim() !== "";
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (name.trim() && tag.trim()) {
      setIsLoading(true); // Começa o loading
      try {
        const data = await faztudo(name, tag);
        navigate("/QueQueBilda/perfil", { state: { name, tag, data } });
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        alert("Nome ou tag inválidos :(");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const alol =
    "https://authenticate.riotgames.com/?client_id=prod-xsso-leagueoflegends&code_challenge=QgecPyWP9wod9PTUGgBN5KfDIDGU9EdZPmTfUub8eps&locale=pt_BR&method=riot_identity_signup&platform=web&redirect_uri=https%3A%2F%2Fauth.riotgames.com%2Fauthorize%3Fclient_id%3Dprod-xsso-leagueoflegends%26code_challenge%3DQgecPyWP9wod9PTUGgBN5KfDIDGU9EdZPmTfUub8eps%26code_challenge_method%3DS256%26locale%3Dpt_BR%26prompt%3Dsignup%26redirect_uri%3Dhttps%253A%252F%252Fxsso.leagueoflegends.com%252Fredirect%26response_type%3Dcode%26scope%3Dopenid%2520account%2520email%2520offline_access%26show_region%3Dtrue%26state%3D52268c8bfb2284d2302af19a5c%26uri%3Dhttps%253A%252F%252Fsignup.leagueoflegends.com%252Fpt-br%252Fsignup%252Fredownload%253Fpage_referrer%253Dindex&show_region=true";
  return (
    <div className="login">
      <main className="bg-fundo-login fundo-login">
        {" "}
        <aside className="aba-esquerda">
          <figure className="figure-logo">
            <img className="logo" src={logo} alt="" />
          </figure>
          <label class className="label-h1">
            <h1>Fazer login</h1>
          </label>

          <div class="label-float">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              required
              className="inpt"
              onKeyDown={enter}
            />
            <label>Nome de Usuário</label>
          </div>

          <div class="label-float">
            <input
              type="text"
              onChange={(e) => setTag(e.target.value)}
              placeholder=" "
              required
              className="inpt"
              onKeyDown={enter}
            />
            <label>Tag</label>
          </div>

          <div className="classe-botao">
            <button
              className={`botao-procura ${isFormValid ? "active" : "inactive"}`}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <VscArrowRight
                  style={{ width: "20px", height: "20px", margin: "auto" }}
                />
              )}
            </button>
          </div>
          <label className="label-criar-conta" htmlFor="">
            <strong className="criar-conta">
              <a target="_black" href={alol}>
                Criar conta
              </a>
            </strong>
            <p>
              <strong>
                ESTE APLICATIVO É PROTEGIDO POR HCAPTCHA. A POLITICA DE
                PROVACIDADE E OS TERMOS DE SERVIÇO SÃO APLICÁVEIS.
              </strong>
            </p>
          </label>
        </aside>
      </main>
    </div>
  );
}

export default Home;
