// Import axios
import axiosClient from "../config/axios";
import { v4 as uuidv4 } from "uuid";
import { config } from '../config/config';

export const playerService = {
  getPlayersByName,
  getPlayersByTeam,
  addId,
};

async function getPlayersByName(search, order, page) {
  return await axiosClient.get(
    `/api/v1/players?search=${search}&order=${order}&page=${page}`
  );
}

async function getPlayersByTeam(team, page) {
  return await axiosClient.post(`/api/v1/team`, {
    Name: team,
    Page: page,
  });
}

function addId(data) {
  let players = data.Players;
  const playersResult = players.map((player) => ({
    ...player,
    id: uuidv4(),
  }));

  data.Players = playersResult;
  return data;
}
