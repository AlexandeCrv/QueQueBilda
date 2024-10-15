import React from "react";
import pta from "../assets/8005.png";
import conqueror from "../assets/8010.png";
import pesinho from "../assets/8021.png";
import eletrocutar from "../assets/8112.png";
import colheita from "../assets/8128.png";
import aery from "../assets/8214.png";
import acometa from "../assets/8229.png";
import impeto from "../assets/8230.png";
import gelinho from "../assets/8351.png";
import first from "../assets/8369.png";
import grasp from "../assets/8437.png";
import choq from "../assets/8439.png";
import guardian from "../assets/8465.png";
import chuva from "../assets/9923.png";
import determinacao from "../assets/8444.png";
import precisao from "../assets/9104.png";
import inpiracao from "../assets/8347.png";
import letal from "../assets/8008.png";
import feitico from "../assets/8237.png";
import domain from "../assets/8138.png";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import HoverMenor from "../components/HoverMenor";

function Previw({ matchDetails }) {
  const [augments, setAugments] = useState([]);
  const [itens, setItens] = useState([]);
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
  const getChampionImageForUser = (participants, userName) => {
    if (!userName)
      return "https://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/1.png"; // Fallback image

    const normalizedUserName = userName.toLowerCase().trim();
    const user = participants.find(
      (participant) =>
        participant.summonerName?.toLowerCase().trim() === normalizedUserName
    );

    if (user && championData) {
      const champion = Object.values(championData).find(
        (champ) => champ.key === user.championId?.toString()
      );

      if (champion) {
        return `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${champion.image.full}`;
      }
    }
    return; // Fallback image
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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/14.17.1/data/pt_BR/item.json"
        );
        const data = await response.json();
        setItens(data.data); // Armazene os itens no estado
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    };

    fetchItems();
  }, []);
  const totalminons = (participants) => {
    let total = 0;
    participants.forEach((participant) => {
      total +=
        participant.totalMinionsKilled +
        participant.totalAllyJungleMinionsKilled +
        participant.totalEnemyJungleMinionsKilled;
    });
    console.log("totalminons:", total);
    return total;
  };
  const getSpellImage = (spellId) => {
    if (spellId && spellsMap[spellId] && spellsMap[spellId].image) {
      return `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/spell/${spellsMap[spellId].image.full}`;
    }
    return null;
  };
  useEffect(() => {
    const fetchAugments = async () => {
      try {
        const response = await fetch(
          "https://raw.communitydragon.org/latest/cdragon/arena/pt_br.json"
        );
        const data = await response.json();

        // Verifique a estrutura dos dados

        // Se data não for um array, ajuste aqui conforme necessário
        if (Array.isArray(data)) {
          setAugments(data);
        } else if (data.augments) {
          setAugments(data.augments); // Ajuste conforme a estrutura correta
        } else {
          console.error("Dados de augments não encontrados");
        }
      } catch (error) {
        console.error("Erro ao buscar augments:", error);
      }
    };

    fetchAugments();
  }, []);
  // Função para obter o caminho da imagem do augment com base no ID

  const BASE_URL = "https://raw.communitydragon.org/latest/game/";

  const calculateMVP = (participants, winningTeamId) => {
    let mvp = null;
    let highestScore = -Infinity;

    participants.forEach((participant) => {
      if (participant.teamId === winningTeamId) {
        const minions =
          (participant.totalMinionsKilled || 0) +
          (participant.totalAllyJungleMinionsKilled || 0) +
          (participant.totalEnemyJungleMinionsKilled || 0);

        const killsWeight = 1;
        const assistsWeight = 0.5;
        const goldWeight = 0.11;
        const deathsWeight = -1;
        const minionsWeight = 0.8;
        const visionWeight = 0.1;

        const score =
          (participant.kills || 0) * killsWeight +
          (participant.assists || 0) * assistsWeight +
          (participant.goldEarned || 0) * goldWeight -
          (participant.deaths || 0) * deathsWeight +
          minions * minionsWeight +
          (participant.visionScore || 0) * visionWeight;

        const mvpScore = score * 0.01;

        if (mvpScore > highestScore) {
          highestScore = mvpScore;
          mvp = participant;
          mvp.score = mvpScore;
        }
      }
    });

    return mvp;
  };

  const winningTeamId = matchDetails.info.teams.find((team) => team.win).teamId;
  const mvp = calculateMVP(matchDetails.info.participants, winningTeamId);

  const getAugmentImage = (augmentId) => {
    const augment = augments.find((aug) => aug.id === augmentId);

    if (augment) {
      return {
        image: `${BASE_URL}${augment.iconLarge}`,
        name: augment.name,
      };
    }
    console.log("Não tem link para o augment:", augmentId);
    return null;
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

  const runeImages = {
    8005: pta,
    8010: conqueror,
    8014: precisao,
    8112: eletrocutar,
    8021: pesinho,
    8128: colheita,
    8214: aery,
    8229: acometa,
    8230: impeto,
    8351: gelinho,
    8242: determinacao,
    8009: precisao,
    8369: first,
    8437: grasp,
    8439: choq,
    8465: guardian,
    9923: chuva,
    8444: determinacao,
    8237: feitico,
    9104: precisao,
    8347: inpiracao,
    8345: inpiracao,
    8473: determinacao,
    8210: feitico,
    8410: inpiracao,
    8008: letal,
    8224: feitico,
    8236: feitico,
    8275: feitico,
    8234: feitico,
    8143: domain,
    8135: domain,
    8453: determinacao,
    8444: determinacao,
    8299: precisao,
    8304: inpiracao,
    8233: feitico,
    8126: domain,
    9105: precisao,
    9111: precisao,
    8401: determinacao,
    8446: precisao,
    8017: precisao,
    8429: determinacao,
    9103: precisao,
    8451: determinacao,
    8226: feitico,
    8313: inpiracao,
    8106: domain,
    8139: domain,
    9101: precisao,
    // Adicione outros IDs de runas e suas imagens aqui
  };

  const minutos = (second) => {
    const minutos = Math.floor(second / 60);
    const segundos = second % 60;
    return `${minutos}m ${segundos}s`;
  };

  const getRuneImage = (runeId) => {
    return runeImages[runeId] || null;
  };
  const getItemImage = (itemId) => {
    return itemId
      ? `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/item/${itemId}.png`
      : null;
  };
  if (!matchDetails || !matchDetails.info) {
    return <div className="load-spinner">Loading...</div>;
  }

  const location = useLocation();
  const { matches, championData, name, participants } = location.state || {
    name: "",
    matches: [],
    championData: {},
    itens: {},
  };

  // Encontrar o participante específico
  const participant = matchDetails.info.participants.find(
    (p) => p.summonerName?.toLowerCase().trim() === name?.toLowerCase().trim()
  );
  const duoParticipant = matchDetails.info.participants.find(
    (p) =>
      p.playerSubteamId === participant?.playerSubteamId &&
      p.participantId !== participant.participantId
  );
  return (
    <div
      style={{ width: "1150px", height: "160px " }}
      className="flex ml-6 justify-between"
    >
      <div className=" ">
        {/* Exibir data e hora */}
        <div className="">
          <span style={{}} className="text-white text-sm  ">
            {matchDetails.info.gameCreation
              ? new Date(matchDetails.info.gameCreation).toLocaleString("pt-BR")
              : "Data indisponível"}
          </span>

          <span className="text-white text-sm  ">
            <br />
            Tempo de partida:{" "}
            {matchDetails.info.gameDuration
              ? minutos(matchDetails.info.gameDuration)
              : "Tempo indisponível"}
          </span>
          <span
            className={` justify-between text-sm p-1 rounded  flex ${
              didUserWin(matchDetails.info.participants, name)
                ? "bg-vermelho"
                : "bg-azul"
            }`}
          >
            {didUserWin(matchDetails.info.participants, name)
              ? "Vitória"
              : "Derrota"}
            <div className=" mr-32">
              <h1 className="">{ModoDeJogo(matchDetails.info.gameMode)}</h1>
            </div>
          </span>
        </div>
        <div className=" border-dourado border-t-2  mt-1">
          <span className="text-white relative bg-black">
            <div className=" ">
              <div className="flex   items-center">
                <img
                  title={participant?.championName}
                  className="w-16 relative"
                  src={getChampionImageForUser(
                    matchDetails.info.participants,
                    name
                  )}
                  alt="Champion"
                />
                <div className="text-base bg-black rounded-full text-white top-0 absolute w-6 h-6">
                  <p className="text-center">
                    {participant?.champLevel || "N/A"}
                  </p>
                </div>

                <div className="flex">
                  {participant.playerAugment1 !== 0 ? (
                    <div>
                      <div className="flex spell-images mt-2">
                        {[1, 2, 3, 4].map((augmentIdx) => {
                          const augmentId =
                            duoParticipant[`playerAugment${augmentIdx}`];
                          const augmentData = getAugmentImage(augmentId);

                          return augmentData ? (
                            <HoverMenor
                              key={augmentIdx}
                              content={augmentData.description}
                            >
                              <div className="flex items-center">
                                <img
                                  src={augmentData.image}
                                  alt={`Augment ${augmentData.name}`}
                                  className="w-10 h-10 relative ml-1"
                                />
                              </div>
                            </HoverMenor>
                          ) : (
                            <div key={augmentIdx}></div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-14 flex">
                        <div className="flex spell-images w-52 h-12 flex-col">
                          {[1, 2].map((spellIdx) => {
                            const spellId =
                              participant?.[`summoner${spellIdx}Id`];
                            return spellId ? (
                              <img
                                key={spellIdx}
                                className="spell-image w-6 h-6 ml-1"
                                src={getSpellImage(spellId)}
                                alt={`Spell ${spellId}`}
                              />
                            ) : null;
                          })}
                        </div>

                        {/* Exibir Runas */}
                        <div className="w-28">
                          {(() => {
                            if (!participant?.perks?.styles) return [];
                            const runes = participant.perks.styles.map(
                              (style) =>
                                style.selections.length > 0
                                  ? style.selections[0].perk
                                  : null
                            );
                            return runes
                              .filter((rune) => rune !== null)
                              .slice(0, 2);
                          })().map((runeId, idx) => (
                            <div key={idx}>
                              <img
                                className="w-6 h-6"
                                src={getRuneImage(runeId)}
                                alt={`Rune ${idx}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className=" w-60 flex flex-wrap ">
                    {participant.pentakills >= 1 ? (
                      <div className="text-sm w-24 text-center bg-azul rounded-2xl text-white">
                        <p>Abate Pentakillo </p>
                      </div>
                    ) : (
                      <div>
                        {participant.quadraKills ? (
                          <div className="text-sm w-28 text-center bg-azul rounded-2xl text-white">
                            <p>Abate quádruplo </p>
                          </div>
                        ) : (
                          <div>
                            {participant.tripleKills >= 1 ? (
                              <div className="text-sm w-24 text-center bg-azul rounded-2xl text-white">
                                <p>Abate Triplo </p>
                              </div>
                            ) : (
                              <div>
                                {participant.doubleKills >= 1 && (
                                  <div className="text-sm w-24 text-center bg-azul rounded-2xl text-white">
                                    <p>Abate Duplo </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <div>
                      {participant.killingSprees >= 1 && (
                        <div
                          style={{ backgroundColor: "#eb9c00" }}
                          className="text-sm w-24 text-center  rounded-2xl ml-1 text-white"
                        >
                          <p>killingSprees</p>
                        </div>
                      )}
                    </div>
                    <div>
                      {mvp === participant && (
                        <div>
                          <div
                            style={{ backgroundColor: "#00ae2a" }}
                            className="text-sm w-24 text-center leading-3 rounded-2xl text-white"
                          >
                            <p>MVP</p>
                            {/* Exibindo a pontuação do MVP já calculada */}
                            <p>{mvp.score.toFixed(2)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Exibir Itens */}
                  <div className="ml-3 font-bold w-64 padding-2 text-white"></div>
                </div>
              </div>
              <div className="flex flex-wrap">
                {/* Exibir as imagens dos itens */}
                <div className="flex flex-wrap border-solid border-2 border-dourado justify-between">
                  {[...Array(7)].map((_, idx) => {
                    const itemId = participant[`item${idx}`]; // Obtém o ID do item

                    const itemDetails = itemId ? itens[itemId] : null;

                    return itemId ? (
                      <HoverMenor
                        key={idx}
                        content={
                          <div className="text-xs hover-content">
                            {" "}
                            {/* Certifique-se de que a classe está aplicada aqui */}
                            <div className="flex justify-between">
                              <strong>{itemDetails?.name}</strong>
                              <div className="flex">
                                <strong>{itemDetails?.gold.total}</strong>
                                <img
                                  className="ml-1"
                                  src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/items.png"
                                  alt=""
                                />
                              </div>
                            </div>
                            <p className="item-description">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: itemDetails?.description,
                                }}
                              />
                            </p>
                          </div>
                        }
                      >
                        <div>
                          <img
                            className="w-8 h-8 m-1 border-2 border-dourado justify-between"
                            src={`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/item/${itemId}.png`}
                            alt={`Item ${itemDetails?.name || itemId}`} // Usa o nome ou o ID do item
                          />
                        </div>
                      </HoverMenor>
                    ) : (
                      <div key={idx} className="w-8 h-8"></div>
                    );
                  })}
                </div>
              </div>

              {/* Exibir KDA */}
              {participant && (
                <div className="kda flex">
                  <p className="text-xl">
                    {participant.kills || 0}/{participant.deaths || 0}/
                    {participant.assists || 0}
                  </p>
                  <p>{totalminons}</p>
                </div>
              )}
            </div>
          </span>
        </div>
        {/* DUPLA! */}
        {matchDetails.info.participants.length === 16 && duoParticipant && (
          <div>
            <div className="mt-2 border-dourado border-t-2 ">
              <div className="flex items-center mb-2 relative">
                <img
                  className="w-16 relative"
                  src={getChampionImageForUser(
                    matchDetails.info.participants,
                    duoParticipant.summonerName
                  )}
                  alt="Champion"
                />
                {/* MIVEL DENTRO DA IMG */}
                <div className="text-base text-center bg-black rounded-full text-white top-0 absolute w-6 h-6">
                  <p>{duoParticipant.champLevel || "N/A"}</p>
                </div>

                {/* AUGMENTS DUO */}
                <div className="flex spell-images mt-2">
                  {[1, 2, 3, 4].map((augmentIdx) => {
                    const augmentId =
                      duoParticipant[`playerAugment${augmentIdx}`];
                    const augmentData = getAugmentImage(augmentId);

                    return augmentData ? (
                      <div key={augmentIdx} className="flex items-center">
                        <img
                          src={augmentData.image}
                          alt={`Augment ${augmentData.name}`}
                          className="w-10 h-10 relative ml-1"
                        />
                      </div>
                    ) : (
                      <div key={augmentIdx}></div>
                    );
                  })}
                </div>
              </div>

              <div className="ml-3 font-bold text-white">
                {/*  KDA */}
                <div className="kda">
                  <p>
                    KDA: {duoParticipant.kills || 0}/
                    {duoParticipant.deaths || 0}/{duoParticipant.assists || 0}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap">
                {/* ITENS DUO */}
                <div className="flex flex-wrap border-solid border-2 border-dourado justify-between">
                  {[...Array(7)].map((_, idx) => {
                    const itemId = duoParticipant[`item${idx}`];
                    return itemId ? (
                      <img
                        key={idx}
                        className="w-8 h-8 m-1 border-2 border-dourado justify-between"
                        src={getItemImage(itemId)}
                        alt={`Item ${itemId}`}
                      />
                    ) : (
                      <div></div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* TIMES NOMES*/}
      <div style={{ width: "600px", height: "250px" }} className="flex ">
        <div className="w-1/2 p-1.5 ">
          {/* Exibir os 5 primeiros personagens do Time 1 */}
          {matchDetails.info.participants
            .filter((player) => player.teamId === 100) // Time 1
            .slice(0, 8) // Limitar a 5 jogadores
            .map((player) => (
              <div
                key={player.participantId}
                className="flex items-center mb-2"
              >
                <img
                  title={player.championName}
                  style={{
                    width:
                      matchDetails.info.participants.length > 10
                        ? "39px"
                        : "35px",
                  }}
                  src={getChampionImageForUser(
                    matchDetails.info.participants,
                    player.summonerName
                  )}
                  alt={`Champion ${player.championId}`}
                />
                <div className="flex">
                  <p>
                    {player.riotIdGameName}# {player.riotIdTagline}
                  </p>
                  <div>
                    {mvp === player && (
                      <div>
                        <div
                          style={{ backgroundColor: "#00ae2a" }}
                          className="text-sm w-24 text-center leading-3 rounded-2xl text-white"
                        >
                          <p>MVP</p>
                          {/* Exibindo a pontuação do MVP já calculada */}
                          <p>
                            {mvp.kills ||
                              0 * 3 + // Peso maior para kills
                                mvp.assists ||
                              0 * 1 + // Peso de assists
                                mvp.goldEarned ||
                              0 / 1000 - // Peso do ouro ajustado
                                mvp.deaths ||
                              0 * 2.5 + // Peso maior para mortes
                                mvp.totalMinionsKilled ||
                              0 * 1 + // Peso dos minions
                                mvp.totalAllyJungleMinionsKilled ||
                              0 * 0.1 + // Peso dos minions da selva aliada
                                mvp.totalEnemyJungleMinionsKilled ||
                              0 * 0.1 + // Peso dos minions da selva inimiga
                                mvp.visionScore ||
                              0 *
                                (0.5) // Peso maior para visão
                                  .toFixed(2)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="w-1/2 p-1.5">
          {/* Exibir os 5 primeiros personagens do Time 2 */}
          {matchDetails.info.participants
            .filter((player) => player.teamId === 200) // Time 2
            .slice(0, 8) // Limitar a 5 jogadores
            .map((player) => (
              <div
                key={player.participantId}
                className="flex items-center mb-2"
              >
                <img
                  title={player.championName}
                  style={{
                    width:
                      matchDetails.info.participants.length > 10
                        ? "39px"
                        : "35px",
                  }}
                  src={getChampionImageForUser(
                    matchDetails.info.participants,
                    player.summonerName
                  )}
                  alt={`Champion ${player.championId}`}
                />
                <div className="flex">
                  <p>
                    {player.riotIdGameName}# {player.riotIdTagline}
                  </p>
                  <div>
                    {mvp === player && (
                      <div>
                        <div
                          style={{ backgroundColor: "#00ae2a" }}
                          className="text-sm w-24 text-center leading-3 rounded-2xl text-white"
                        >
                          <p>MVP</p>
                          {/* Exibindo a pontuação do MVP já calculada */}
                          <p>
                            {mvp.kills ||
                              0 * 3 + mvp.assists ||
                              0 * 1 + mvp.goldEarned ||
                              0 / 1000 - mvp.deaths ||
                              0 * 2.5 + mvp.totalMinionsKilled ||
                              0 * 1 + mvp.totalAllyJungleMinionsKilled ||
                              0 * 0.1 + mvp.totalEnemyJungleMinionsKilled ||
                              0 * 0.1 + mvp.visionScore ||
                              0 * (0.5).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Previw;
