const cors = require("cors");
const express = require("express");
const axios = require("axios");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.RIOT_API_KEY;

const americasApi = axios.create({
  baseURL: "https://americas.api.riotgames.com",
  headers: {
    "X-Riot-Token": apiKey,
  },
});

const br1Api = axios.create({
  baseURL: "https://br1.api.riotgames.com",
  headers: {
    "X-Riot-Token": apiKey,
  },
});

// Rota para buscar informações de um invocador pelo nome e tag
app.get("/summoner/name/:name/tag/:tag", async (req, res) => {
  console.log("Request received for /summoner/:name/:tag");
  const { name, tag } = req.params;

  try {
    const response = await americasApi.get(
      `/riot/account/v1/accounts/by-riot-id/${name}/${tag}`
    );
    console.log("Response for /summoner/:name/:tag:", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

// Rota para buscar informações de um invocador pelo PUUID
app.get("/summoner/puuid/:puuid", async (req, res) => {
  console.log("Request received for /summoner/puuid/:puuid");
  const { puuid } = req.params;

  try {
    const response = await br1Api.get(
      `/lol/summoner/v4/summoners/by-puuid/${puuid}`
    );
    console.log(response);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});
// Rota para buscar informações de um Maestria pelo PUUID
app.get("/summoner/puuid/maestria/:puuid", async (req, res) => {
  console.log("Request received for /summoner/puuid/:puuid");
  const { puuid } = req.params;

  try {
    const response = await br1Api.get(
      `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top`
    );
    console.log(response);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

// Rota para buscar o Elo de um invocador pelo Summoner ID
app.get("/league/entries/by-summoner/:summonerId", async (req, res) => {
  console.log("Request received for /league/entries/by-summoner/:summonerId");
  const { summonerId } = req.params;

  try {
    const response = await br1Api.get(
      `/lol/league/v4/entries/by-summoner/${summonerId}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

// Rota para buscar o histórico de partidas pelo PUUID
app.get("/history/:puuid", async (req, res) => {
  console.log("Request received for /history/:puuid");
  const { puuid } = req.params;

  try {
    const response = await americasApi.get(
      `/lol/match/v5/matches/by-puuid/${puuid}/ids`
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

// Rota para buscar os detalhes de uma partida específica
app.get("/match/:matchId", async (req, res) => {
  console.log("Request received for /match/:matchId");
  const { matchId } = req.params;

  try {
    const response = await americasApi.get(`/lol/match/v5/matches/${matchId}`);

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});
app.get("/champ", async (req, res) => {
  console.log("Request received for /match/:matchId");
  const { matchId } = req.params;

  try {
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/14.17.1/data/en_US/champion.json`
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});
app.get("/augument", async (req, res) => {
  console.log("Request received for /match/:matchId");
  const { matchId } = req.params;

  try {
    const response = await axios.get(
      `https://raw.communitydragon.org/13.16/cdragon/arena/en_us.json`
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});
app.get("/icon", async (req, res) => {
  console.log("Request received for /icon");
  try {
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/14.17.1/data/en_US/profileicon.json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});
app.get("/spells", async (req, res) => {
  console.log("Request received for /icon");
  try {
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/14.17.1/data/en_US/summoner.json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});
app.get("/itens", async (req, res) => {
  console.log("Request received for /icon");
  try {
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/14.17.1/data/en_US/item.json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
