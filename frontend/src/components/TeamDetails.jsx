import React, { useState, useEffect } from "react";
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
import HoverMenor from "./HoverMenor";

const ChangeNameRota = (position) => {
  const routeMap = {
    BOTTOM: "AD CARRY",
    UTILITY: "SUPPORT",
  };
  return routeMap[position] || position;
};

const TeamDetails = ({
  participants,
  teamId,
  getItemImage,
  getSpellImage,
  getChampionImage,
  userName,
  matchDetails,
  name,
}) => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/14.17.1/data/pt_BR/item.json"
        );
        const data = await response.json();
        setItens(data.data);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    };

    fetchItems();
  }, []);

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
    8139: domain,
    8306: inpiracao,
    8226: feitico,
    8321: inpiracao,
    8463: determinacao,
    8105: domain,
    8316: inpiracao,
    8138: domain,
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
    9101: precisao,
  };
  function getPercentage(value, maxValue) {
    if (maxValue > 0) {
      return (value / maxValue) * 100;
    }
    return 0;
  }

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

  const maxDamage = Math.max(
    ...participants.map((p) => p.totalDamageDealtToChampions)
  );
  const maxTowerDamage = Math.max(
    ...participants.map((p) => p.damageDealtToTurrets)
  );
  const maxMitigatedDamage = Math.max(
    ...participants.map((p) => p.damageSelfMitigated)
  );
  const maxGoldSpent = Math.max(...participants.map((p) => p.goldSpent));
  const maxGoldEarned = Math.max(...participants.map((p) => p.goldEarned));

  const getRuneImage = (runeId) => {
    return runeImages[runeId] || null;
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

      return { userTeamId: null, userTeamWon: false };
    }

    const userTeamId = user.teamId;
    const userTeamWon = participants.some(
      (participant) =>
        participant.teamId === userTeamId && participant.win === true
    );

    return { userTeamId, userTeamWon };
  };

  const { userTeamId, userTeamWon } = didUserWin(participants, userName);
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 text-white">
        {teamId === 100 ? "Time 1" : "Time 2"}
      </h2>
      {participants
        .filter((participant) => participant.teamId === teamId)
        .map((participant, index) => {
          const championImageUrl = getChampionImage(participant.championId);
          return (
            <div
              style={{
                border: `2px solid ${
                  teamId === userTeamId
                    ? userTeamWon
                      ? "#5383E8"
                      : " #E84057"
                    : userTeamWon
                    ? "#E84057"
                    : "#5383E8"
                }`,
                height: "280px",
                width: "590px",
              }}
              key={index}
              className={`${
                userTeamWon
                  ? teamId === userTeamId
                    ? "bg-azulmaisescuro"
                    : "bg-vermelhomaisescuro"
                  : teamId === userTeamId
                  ? "bg-vermelhomaisescuro"
                  : "bg-azulmaisescuro"
              } champion-container mb-4 p-2 rounded flex justify-between `}
            >
              <div className="relative  w-64 ">
                {championImageUrl ? (
                  <div className=" ">
                    <div className=" flex">
                      <img
                        title={participant?.championName}
                        className="champion-image"
                        src={championImageUrl}
                        alt={`Champion ${participant.championId}`}
                      />
                      <div className="flex flex-wrap  ">
                        <div className="flex flex-col h-14 ml-1 ">
                          <div className="flex">
                            {" "}
                            {getSpellImage(participant.summoner1Id) && (
                              <img
                                className="w-10 h-10 item-image border-solid border-2   border-dourado"
                                src={getSpellImage(participant.summoner1Id)}
                                alt={`Spell 1`}
                              />
                            )}
                          </div>
                          <div className="mt-1">
                            {getSpellImage(participant.summoner2Id) && (
                              <img
                                className="w-10 h-10 item-image border-solid border-2   border-dourado"
                                src={getSpellImage(participant.summoner2Id)}
                                alt={`Spell 2`}
                              />
                            )}
                          </div>
                        </div>
                        <div className="h-14">
                          <div className="w-">
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
                                  className=" ml-2 w-7 h-7"
                                  src={getRuneImage(runeId)}
                                  alt={`Rune ${idx}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          {mvp === participant && (
                            <div>
                              <div
                                style={{ backgroundColor: "#00ae2a" }}
                                className="text-sm w-20 ml-1 text-center leading-3 rounded-2xl  text-white"
                              >
                                <p>MVP</p>
                                <p>
                                  {mvp.kills ||
                                    0 * 3 + mvp.assists ||
                                    0 * 1 + mvp.goldEarned ||
                                    0 / 1000 - mvp.deaths ||
                                    0 * 2.5 + mvp.totalMinionsKilled ||
                                    0 * 1 + mvp.totalAllyJungleMinionsKilled ||
                                    0 * 0.1 +
                                      mvp.totalEnemyJungleMinionsKilled ||
                                    0 * 0.1 + mvp.visionScore ||
                                    0 * (0.5).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>

                    <div className="">
                      {/* Exibir as imagens dos itens */}
                      <div className="flex flex-wrap border-solid mt-1 border-2 w-32 border-dourado bg-black justify-between">
                        {[...Array(7)].map((_, idx) => {
                          const itemId = participant[`item${idx}`];

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
                                  alt={`Item ${itemDetails?.name || itemId}`}
                                />
                              </div>
                            </HoverMenor>
                          ) : (
                            <div key={idx} className="w-8 h-8"></div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Champion image not found</p>
                )}
                <div className="text-base bg-black rounded-full text-white absolute top-0 w-6 h-6 text-center">
                  {participant.champLevel}
                </div>
              </div>

              <div className="col-span-3 grid grid-cols-3 gap-1">
                {/* Combate */}
                <div className="p-2 bg-black rounded-lg border h-60 mt-1 ml-2 border-gray-600 flex flex-col justify-between">
                  <p className="text-lg font-bold mb-2 h-16 text-center ">
                    {participant.summonerName}
                    <p>#{participant.riotIdTagline}</p>
                    <p className="text-sm opacity-50">
                      {participant.championName}
                    </p>
                  </p>

                  <p className="text-sm text-center">
                    {ChangeNameRota(participant.individualPosition)}
                  </p>
                  <div className="flex justify-center items-center space-x-1">
                    <p className="flex items-center">
                      <img
                        src="https://raw.communitydragon.org/latest/game/assets/ux/tft/skilltree/skillicons/swords.png"
                        alt="Kills"
                        className="w-3 h-3"
                      />{" "}
                      {participant.kills}
                    </p>
                    <p className="flex items-center">
                      <img
                        src="https://img.icons8.com/?size=100&id=82876&format=png&color=FFFFFF"
                        alt="Deaths"
                        className="w-3 h-3"
                      />{" "}
                      {participant.deaths}
                    </p>
                    <p className="flex items-center">
                      <img
                        src="https://img.icons8.com/?size=100&id=44471&format=png&color=FFFFFF"
                        alt="Assists"
                        className="w-3 h-3"
                      />{" "}
                      {participant.assists}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/scoreboard-stat-switcher-minions-slain.svg"
                      alt=""
                    />
                    <p className="font-bold text-lg">
                      {participant.totalMinionsKilled +
                        participant.totalAllyJungleMinionsKilled +
                        participant.totalEnemyJungleMinionsKilled}
                    </p>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>
                      First Blood:{" "}
                      <span className="font-bold">
                        {participant.firstBloodKill ? "Sim" : "Não"}
                      </span>
                    </p>
                    <p>
                      Assistência First Blood:{" "}
                      <span className="font-bold">
                        {participant.firstBloodAssist ? "Sim" : "Não"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Dano e Objetivos */}
                <div className="p-2 bg-black rounded-lg border  h-60 mt-1 border-gray-600">
                  <p className="font-semibold">Dano Total a Campeões:</p>
                  <p className="font-bold flex text-lg text-red-500">
                    {participant.totalDamageDealtToChampions}
                    <img
                      className="w-4 h-4 ml-1 mt-1"
                      src="https://raw.communitydragon.org/latest/game/assets/ux/tft/skilltree/skillicons/swords.png"
                      alt=""
                    />
                  </p>
                  <div className="w-full bg-gray-300 h-2 rounded-lg mt-1">
                    <div
                      className="bg-red-500 h-2 rounded-lg"
                      style={{
                        width: `${getPercentage(
                          participant.totalDamageDealtToChampions,
                          maxDamage
                        )}%`,
                      }}
                    ></div>
                  </div>

                  <p className="mt-1 font-semibold">Dano a Torres:</p>
                  <p className="font-bold flex text-lg text-blue-500">
                    {participant.damageDealtToTurrets}
                    <img
                      className="w-5 h-5"
                      src="https://raw.communitydragon.org/latest/game/assets/ux/minimap/icons/icon_ui_tower_minimap_med.png"
                      alt=""
                    />
                  </p>
                  <div className="w-full bg-gray-300 h-2 rounded-lg mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-lg"
                      style={{
                        width: `${getPercentage(
                          participant.damageDealtToTurrets,
                          maxTowerDamage
                        )}%`,
                      }}
                    ></div>
                  </div>

                  <p className="mt-1 font-semibold">Dano Mitigado:</p>
                  <p className="font-bold text-lg flex text-green-500">
                    {participant.damageSelfMitigated}
                    <img
                      className="w-5 h-5  mt-1"
                      src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/coc-icon-shield.svg"
                      alt=""
                    />
                  </p>
                  <div className="w-full bg-gray-300 h-2 rounded-lg mt-1">
                    <div
                      className="bg-green-500 h-2 rounded-lg"
                      style={{
                        width: `${getPercentage(
                          participant.damageSelfMitigated,
                          maxMitigatedDamage
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Status do Jogador */}
                <div
                  style={{ height: "255px" }}
                  className="p-2 bg-black rounded-lg border  border-gray-600"
                >
                  <p className="font-semibold">Gold Gasto:</p>
                  <p className="font-bold flex text-lg text-yellow-500">
                    {participant.goldSpent}
                    <img
                      className="w-4 h-4 ml-1 mt-1"
                      src="https://raw.communitydragon.org/latest/game/assets/ux/tft/skilltree/skillicons/interest.png"
                      alt=""
                    />
                  </p>
                  <div className="w-full bg-gray-300 h-2 rounded-lg mt-1">
                    <div
                      className="bg-yellow-500 h-2 rounded-lg"
                      style={{
                        width: `${getPercentage(
                          participant.goldSpent,
                          maxGoldSpent
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="mt-4 font-semibold">Gold Recebido:</p>
                  <p className="font-bold flex text-lg text-yellow-400">
                    {participant.goldEarned}
                    <img
                      className="w-4 h-4 ml-1 mt-1"
                      src="https://raw.communitydragon.org/latest/game/assets/ux/tft/skilltree/skillicons/interest.png"
                      alt=""
                    />
                  </p>
                  <div className="w-full bg-gray-300 h-2 rounded-lg mt-1">
                    <div
                      className="bg-yellow-400 h-2 rounded-lg"
                      style={{
                        width: `${getPercentage(
                          participant.goldEarned,
                          maxGoldEarned
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className=" font-semibold mt-2">Dano a Objetivos:</p>
                  <p className="font-bold text-lg">
                    {participant.damageDealtToObjectives}
                  </p>
                  <div className="flex  mb-1">
                    <img
                      className="w-6 h-6 "
                      src="https://raw.communitydragon.org/latest/game/assets/ux/minimap/icons/dragon_minimap_icon.png"
                      alt=""
                    />
                    <img
                      className="w-6 h-6 "
                      src="https://raw.communitydragon.org/latest/game/assets/ux/minimap/icons/baron_minimap_icon.png"
                      alt=""
                    />
                    <img
                      className="w-6 h-6 "
                      src="https://raw.communitydragon.org/latest/game/assets/ux/minimap/icons/horde.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TeamDetails;
