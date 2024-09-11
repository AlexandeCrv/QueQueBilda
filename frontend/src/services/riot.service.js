import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5001",
});

export const getSummonerByNameAndTag = async (name, tag) => {
  try {
    const response = await api.get(`/summoner/name/${name}/tag/${tag}`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar invocador por nome e tag:", error);
    throw error;
  }
};

export const getMaestriaByPuuid = async (puuid) => {
  try {
    const response = await api.get(`/summoner/puuid/maestria/${puuid}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar maestria por puuid", error);
    throw error;
  }
};
export const getSummonerByPuuid = async (puuid) => {
  try {
    const response = await api.get(`/summoner/puuid/${puuid}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar invocador por PUUID:", error);
    throw error;
  }
};

export const getEloBySummonerId = async (summonerId) => {
  try {
    const response = await api.get(`/league/entries/by-summoner/${summonerId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar elo por summoner ID:", error);
    throw error;
  }
};

export const getMatchHistoryByPuuid = async (puuid) => {
  try {
    const response = await api.get(`/history/${puuid}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar histórico de partidas por PUUID:", error);
    throw error;
  }
};

export const getMatchDetailsById = async (matchId) => {
  try {
    const response = await api.get(`/match/${matchId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes da partida por ID:", error);
    throw error;
  }
};
export const getChamp = async () => {
  try {
    const response = await api.get(`/champ`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes da partida por ID:", error);
    throw error;
  }
};
export const geticon = async () => {
  try {
    const response = await api.get(`/icon`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes da partida por ID:", error);
    throw error;
  }
};
export const getitens = async () => {
  try {
    const response = await api.get(`/itens`);
    return response.data;
  } catch (error) {
    console.error("Erro ao itens:", error);
    throw error;
  }
};
export const getspells = async () => {
  try {
    const response = await api.get(`/spells`);
    return response.data;
  } catch (error) {
    console.error("Erro ao itens:", error);
    throw error;
  }
};

export const faztudo = async (name, tag) => {
  let data = {};
  try {
    const summonerData = await getSummonerByNameAndTag(name, tag);
    data.nameTag = summonerData;
    const puuid = summonerData.puuid;
    data.champ = await getChamp();
    data.icon = await geticon();
    data.itens = await getitens();
    data.spells = await getspells();

    if (puuid) {
      data.maestria = await getMaestriaByPuuid(puuid);
      const summonerInfo = await getSummonerByPuuid(puuid);
      data.summoner = summonerInfo;
      const summonerId = summonerInfo.id;
      if (summonerId) {
        data.elo = await getEloBySummonerId(summonerId);
      }
      const hist = await getMatchHistoryByPuuid(puuid);

      if (hist && hist.length > 0) {
        data.matchDetails = await getMatchDetailsById(hist[0]);
        data.matchDetails1 = await getMatchDetailsById(hist[1]);
        data.matchDetails2 = await getMatchDetailsById(hist[2]);
        data.matchDetails3 = await getMatchDetailsById(hist[3]);
        data.matchDetails4 = await getMatchDetailsById(hist[4]);
      }
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
