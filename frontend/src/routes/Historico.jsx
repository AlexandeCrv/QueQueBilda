import React from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Historico() {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();
  const { matches, championData, name } = location.state || {
    matches: [],
    championData: {},
  };

  // Função para obter a imagem do campeão
  const getChampionImage = (championId) => {
    if (championData) {
      const champion = Object.values(championData).find(
        (champ) => champ.key === championId.toString()
      );
      return champion
        ? `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${champion.image.full}`
        : null;
    }
    return null;
  };

  // Função para obter a imagem do item
  const getItemImage = (itemId) => {
    return itemId
      ? `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/item/${itemId}.png`
      : null;
  };

  const ChangeNameRota = (position) => {
    const routeMap = {
      BOTTOM: "AD CARRY",
      UTILITY: "SUPPORT",
    };
    return routeMap[position] || position;
  };

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
      return "Ranked Solo 5x5";
    } else if (gameMode === "RANKED_FLEX_SR") {
      return "Ranked Flex";
    } else if (gameMode === "CHERRY") {
      return "2V2";
    }
    return "Outro Modo";
  };
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const didUserWin = (participants, userName) => {
    const user = participants.find(
      (participant) => participant.summonerName === userName
    );
    if (!user) return false;

    const winningTeam = participants.find(
      (participant) =>
        participant.teamId === user.teamId && participant.win === true
    );
    return winningTeam ? user.teamId === winningTeam.teamId : false;
  };

  false;

  return (
    <div className="bg-fundo-historico bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full shadow-inner overflow-hidden">
      <div>
        <Link to="/Que-Que-Bilda">
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
      <div className="text-center text-6xl w-4/5 m-auto">
        <h1 className="text-white">Histórico de Partidas</h1>
      </div>

      {matches && matches.length > 0 ? (
        matches.map((matchDetails, matchIndex) => (
          <section
            key={matchIndex}
            style={{
              borderRadius: "20px",
              padding: "10px",
              color: "white",
              border: `2px solid ${
                didUserWin(matchDetails.info.participants, name)
                  ? "#0000FF"
                  : "#FF0000"
              }`,
              width: "1100px",
              marginBottom: "20px",
            }}
            className="cor-de-fundo-historico w-4/5 m-auto"
          >
            <div className="text-center mb-4 text-2xl mt-4">
              <h2
                className={`text-white p-4 rounded cursor-pointer ${
                  didUserWin(matchDetails.info.participants, name)
                    ? "bg-blue-600"
                    : "bg-red-600"
                }`}
                onClick={() => handleToggle(matchIndex)}
              >
                <div className="text-center text-white mb-4">
                  Data e Hora:{" "}
                  {new Date(matchDetails.info.gameCreation).toLocaleString()}
                  <img
                    className="m-auto"
                    src="https://ddragon.leagueoflegends.com/cdn/14.17.1/img/profileicon/1.png"
                    alt=""
                  />
                </div>
              </h2>
            </div>

            {openIndex === matchIndex && (
              <div>
                <div className="text-center text-3xl mb-4 text-white">
                  Modo de Jogo: {ModoDeJogo(matchDetails.info.gameMode)}
                </div>

                <div className="flex justify-center">
                  {/* Time 1 */}
                  <div className="flex flex-col items-center mx-2 bg-red-700 p-4 rounded">
                    <h2 className="text-xl mb-4 text-white">Time 1</h2>
                    {matchDetails.info.participants
                      .filter((participant) => participant.teamId === 100)
                      .map((participant, index) => {
                        const championImageUrl = getChampionImage(
                          participant.championId
                        );
                        return (
                          <div
                            key={index}
                            className="champion-container bg-slate-500 mb-4 p-2 rounded flex items-center"
                          >
                            {championImageUrl ? (
                              <img
                                className="champion-image"
                                src={championImageUrl}
                                alt={`Champion ${participant.championId}`}
                              />
                            ) : (
                              <p>Champion image not found</p>
                            )}
                            <div className="ml-4 flex items-center">
                              <div className="flex flex-col">
                                <p className="text-lg font-bold">
                                  Nome do Campeão: {participant.championName}
                                </p>
                                <p className="text-sm">
                                  Nome do Jogador: {participant.summonerName}
                                </p>
                                <p className="text-sm">
                                  Rota:{" "}
                                  {ChangeNameRota(
                                    participant.individualPosition
                                  )}
                                </p>
                                <p className="text-sm">
                                  Dano Causado:{" "}
                                  {participant.totalDamageDealtToChampions}
                                </p>
                              </div>
                              <div className="ml-6 flex flex-col justify-center">
                                <p>
                                  K/D/A: {participant.kills}/
                                  {participant.deaths}/{participant.assists}
                                </p>
                                <p>Minions: {participant.totalMinionsKilled}</p>
                              </div>
                              <div className="ml-6">
                                <p>Itens:</p>
                                <div className="flex item-images">
                                  {[
                                    participant.item0,
                                    participant.item1,
                                    participant.item2,
                                    participant.item3,
                                    participant.item4,
                                    participant.item5,
                                    participant.item6,
                                  ].map((itemId, idx) =>
                                    itemId ? (
                                      <img
                                        key={idx}
                                        className="item-image"
                                        src={getItemImage(itemId)}
                                        alt={`Item ${itemId}`}
                                      />
                                    ) : null
                                  )}
                                </div>
                                <p>Spells:</p>
                                <div className="flex space-x-2 item-image">
                                  {getSpellImage(participant.summoner1Id) ? (
                                    <img
                                      src={getSpellImage(
                                        participant.summoner1Id
                                      )}
                                      alt={`Spell 1`}
                                    />
                                  ) : (
                                    <p>Spell 1 not found</p>
                                  )}
                                  {getSpellImage(participant.summoner2Id) ? (
                                    <img
                                      src={getSpellImage(
                                        participant.summoner2Id
                                      )}
                                      alt={`Spell 2`}
                                    />
                                  ) : (
                                    <p>Spell 2 not found</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Time 2 */}
                  <div className="flex flex-col items-center mx-2 bg-blue-700 p-4 rounded">
                    <h2 className="text-xl mb-4 text-white">Time 2</h2>
                    {matchDetails.info.participants
                      .filter((participant) => participant.teamId === 200)
                      .map((participant, index) => {
                        const championImageUrl = getChampionImage(
                          participant.championId
                        );
                        return (
                          <div
                            key={index}
                            className="champion-container bg-slate-500 mb-4 p-2 rounded flex items-center"
                          >
                            {championImageUrl ? (
                              <img
                                className="champion-image"
                                src={championImageUrl}
                                alt={`Champion ${participant.championId}`}
                              />
                            ) : (
                              <p>Champion image not found</p>
                            )}
                            <div className="ml-4 flex items-center">
                              <div className="flex flex-col">
                                <p className="text-lg font-bold">
                                  Nome do Campeão: {participant.championName}
                                </p>
                                <p className="text-sm">
                                  Nome do Jogador: {participant.summonerName}
                                </p>
                                <p className="text-sm">
                                  Rota:{" "}
                                  {ChangeNameRota(
                                    participant.individualPosition
                                  )}
                                </p>
                                <p className="text-sm">
                                  Dano Causado:{" "}
                                  {participant.totalDamageDealtToChampions}
                                </p>
                              </div>
                              <div className="ml-6 flex flex-col justify-center">
                                <p>
                                  K/D/A: {participant.kills}/
                                  {participant.deaths}/{participant.assists}
                                </p>
                                <p>Minions: {participant.totalMinionsKilled}</p>
                              </div>
                              <div className="ml-6">
                                <p>Itens:</p>
                                <div className="flex item-images">
                                  {[
                                    participant.item0,
                                    participant.item1,
                                    participant.item2,
                                    participant.item3,
                                    participant.item4,
                                    participant.item5,
                                    participant.item6,
                                  ].map((itemId, idx) =>
                                    itemId ? (
                                      <img
                                        key={idx}
                                        className="item-image"
                                        src={getItemImage(itemId)}
                                        alt={`Item ${itemId}`}
                                      />
                                    ) : null
                                  )}
                                </div>
                                <p>Spells:</p>
                                <div className="flex space-x-2 item-image">
                                  {getSpellImage(participant.summoner1Id) ? (
                                    <img
                                      src={getSpellImage(
                                        participant.summoner1Id
                                      )}
                                      alt={`Spell 1`}
                                    />
                                  ) : (
                                    <p>Spell 1 not found</p>
                                  )}
                                  {getSpellImage(participant.summoner2Id) ? (
                                    <img
                                      src={getSpellImage(
                                        participant.summoner2Id
                                      )}
                                      alt={`Spell 2`}
                                    />
                                  ) : (
                                    <p>Spell 2 not found</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </section>
        ))
      ) : (
        <div className="text-center text-white text-xl">
          <p>Não há dados de partidas para exibir.</p>
        </div>
      )}
    </div>
  );
}
