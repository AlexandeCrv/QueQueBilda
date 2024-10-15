import React from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { VscArrowUp } from "react-icons/vsc";
import { VscArrowDown } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import Previw from "../components/Previw";
import TeamDetails from "../components/TeamDetails";
export default function Historico() {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();
  const { matches, championData, name, itens } = location.state || {
    name: "",
    matches: [],
    championData: {},
    itens: [],
  };

  const getItemImage = (itemId) => {
    return itemId
      ? `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/item/${itemId}.png`
      : null;
  };
  // Componente separado para os detalhes de um time

  const spellsMap = {
    1: { name: "Cleanse", image: { full: "SummonerBoost.png" } },
    3: { name: "Exhaust", image: { full: "SummonerExhaust.png" } },
    4: { name: "Flash", image: { full: "SummonerFlash.png" } },
    6: { name: "Ghost", image: { full: "SummonerHaste.png" } },
    7: { name: "Heal", image: { full: "SummonerHeal.png" } },
    11: { name: "Smite", image: { full: "SummonerSmite.png" } },
    12: { name: "Teleport", image: { full: "SummonerTeleport.png" } },
    13: { name: "Clarity", image: { full: "SummonerMana.png" } },
    14: { name: "Ignite", image: { full: "SummonerDot.png" } },
    21: { name: "Barrier", image: { full: "SummonerBarrier.png" } },
    30: { name: "To the King!", image: { full: "SummonerPoroRecall.png" } },
    31: { name: "Poro Toss", image: { full: "SummonerPoroThrow.png" } },
    32: { name: "Mark", image: { full: "SummonerSnowball.png" } },
  };

  const getSpellImage = (spellId) => {
    if (spellsMap && spellsMap[spellId] && spellsMap[spellId].image) {
      return `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/spell/${spellsMap[spellId].image.full}`;
    }
    return null;
  };

  const ModoDeJogo = (gameMode) => {
    if (gameMode === "CLASSIC") {
      return "Solo/Duo 5x5";
    } else if (gameMode === "RANKED_FLEX_SR") {
      return " Flex";
    } else if (gameMode === "CHERRY") {
      return "2V2";
    } else if (gameMode === "ARAM") {
      return "ARAM";
    }
    return "Outro Modo";
  };
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const getChampionImage = (championId) => {
    console.log("Champion Data:", matches);
    console.log("Champion ID:", championId);
    if (championData) {
      const champion = Object.values(championData).find(
        (champ) => champ.key === championId.toString()
      );
      console.log("Champion:", champion);

      return champion
        ? `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${champion.image.full}`
        : null;
    }
    return null;
  };
  const didUserWin = (participants, userName) => {
    const normalizedUserName = userName.toLowerCase().trim();

    const user = participants.find(
      (participant) =>
        participant.summonerName.toLowerCase().trim() === normalizedUserName
    );

    if (!user) {
      console.log("User not found:", userName);
      console.log("Participants:", participants);

      return false;
    }

    const userTeamId = user.teamId;
    const userTeamWon = participants.some(
      (participant) =>
        participant.teamId === userTeamId && participant.win === true
    );

    return userTeamWon;
  };
  const getItemDetails = (participant) => {
    const itemIds = [
      participant.item0,
      participant.item1,
      participant.item2,
      participant.item3,
      participant.item4,
      participant.item5,
    ];

    return itemIds
      .map((itemId) => {
        if (itemId) {
          return {
            name: `Item Name for ID ${itemId}`, // Substitua pela lógica real de obtenção do nome
            description: `Description for Item ID ${itemId}`, // Substitua pela lógica real de obtenção da descrição
          };
        }
        return null;
      })
      .filter((item) => item !== null); // Remove itens nulos
  };

  return (
    <div className="bg-fundo-historico bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full shadow-inner overflow-hidden">
      <div>
        <Link to="/QueQueBilda">
          <button className="botao-procura">
            <VscArrowLeft
              style={{
                width: "25px",
                height: "25px",
                margin: "auto",
                color: "white",
              }}
            />
          </button>
        </Link>
      </div>
      <div className="ml-10 text-3xl  ">
        <h4 className="text-white">Partidas recentes(Últimas 10 jogadas)</h4>
      </div>

      {matches && matches.length > 0 ? (
        matches.map((matchDetails, matchIndex) => (
          <section
            key={matchIndex}
            style={{
              borderRadius: "20px",
              color: "white",
              border: `2px solid ${
                didUserWin(matchDetails.info.participants, name)
                  ? "#5383E8"
                  : "#E84057"
              }`,
              width: "1250px",
              marginBottom: "20px",
            }}
            className="bg-fundopreto w-4/5 m-auto "
          >
            <div
              className="flex justify-between w-4/4 h-36"
              style={{
                height:
                  matchDetails.info.participants.length === 10
                    ? "220px"
                    : "380px",
              }}
            >
              <div
                className="flex justify-between w-4/4 h-36"
                style={{
                  height:
                    matchDetails.info.participants.length === 10
                      ? "210px"
                      : "380px",
                }}
              >
                <div className="flex flex-col">
                  {matchDetails.info.participants.length === 16 ? (
                    <>
                      <div
                        className="w-2 ml-4  h-32"
                        style={{
                          backgroundColor: didUserWin(
                            matchDetails.info.participants,
                            name
                          )
                            ? "#5383E8"
                            : "#E84057",
                          marginTop: "80px",
                        }}
                      ></div>
                      <div
                        className="w-2 ml-4 h-32"
                        style={{
                          backgroundColor: didUserWin(
                            matchDetails.info.participants,
                            name
                          )
                            ? "#5383E8"
                            : "#E84057",
                          marginTop: "15px",
                          borderRadius: "20px",
                        }}
                      ></div>
                    </>
                  ) : (
                    <div
                      className="w-2 ml-4  h-32"
                      style={{
                        backgroundColor: didUserWin(
                          matchDetails.info.participants,
                          name
                        )
                          ? "#5383E8"
                          : "#E84057",
                        marginTop: "80px",
                        borderRadius: "20px",
                      }}
                    ></div>
                  )}
                </div>
              </div>
              <Previw
                matchDetails={matchDetails}
                name={name}
                itens={getItemDetails}
                participants={matchDetails.info.participants}
              ></Previw>
              <div
                onClick={() => handleToggle(matchIndex)}
                className="hover:bg-slate-500 w-20 rounded-e-2xl flex justify-center items-center"
              >
                {openIndex === matchIndex ? (
                  <VscArrowUp className="h-6 w-6 collapsible-contenta expanded" />
                ) : (
                  <VscArrowDown className="h-6 w-6 collapsible-contenta" />
                )}
              </div>
            </div>
            <div
              className={`collapsible-content ${
                openIndex === matchIndex ? "expanded" : ""
              }`}
            >
              {openIndex === matchIndex && (
                <div>
                  <div className="text-center text-3xl mt-4 text-white">
                    {ModoDeJogo(matchDetails.info.gameMode)}
                  </div>

                  <section className="flex justify-center" key={matchIndex}>
                    {/* ...outros componentes e lógica */}
                    <TeamDetails
                      participants={matchDetails.info.participants}
                      teamId={100} // Para o time 1
                      getItemImage={getItemImage}
                      getSpellImage={getSpellImage}
                      getChampionImage={getChampionImage}
                      userName={name} // Passando o nome do usuário
                      getItemDetails={getItemDetails}
                      matchDetails={matchDetails}
                      name={name}
                    />
                    <TeamDetails
                      participants={matchDetails.info.participants}
                      teamId={200} // Para o time 2
                      getItemImage={getItemImage}
                      getSpellImage={getSpellImage}
                      getChampionImage={getChampionImage}
                      userName={name} // Passando o nome do usuário
                      getItemDetails={getItemDetails}
                      matchDetails={matchDetails}
                      name={name}
                    />
                    {/* ...continuação do código */}
                  </section>
                </div>
              )}
            </div>
          </section>
        ))
      ) : (
        <div className="text-center text-white loading-spinner"></div>
      )}
    </div>
  );
}
