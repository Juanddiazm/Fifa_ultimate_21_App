import { FilterQuery, QueryOptions } from "mongoose";

import Player, { PlayerDocument } from "../model/player.model";

export const findByQuery = async (options?: QueryOptions) => {
  // find One where name is "Cristiano Ronaldo"
  const players = await Player.paginate(options);

  return players;
};
