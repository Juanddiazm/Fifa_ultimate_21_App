import {
  GET_PLAYERS_SEARCH_BY_TEAM_REQUEST,
  GET_PLAYERS_SEARCH_BY_TEAM_SUCCESS,
  GET_PLAYERS_SEARCH_BY_TEAM_FAILURE,
  GET_PLAYERS_SEARCH_BY_NAME_REQUEST,
  GET_PLAYERS_SEARCH_BY_NAME_SUCCESS,
  GET_PLAYERS_SEARCH_BY_NAME_FAILURE,
} from "../types";

import { playerService } from "../services/playerService";

export const playerActions = {
  searchPlayersByTeamAction,
  searchPlayersByNameAction,
};

// SearchPlayersByTeamAction
export function searchPlayersByTeamAction(team, page) {
  return async (dispatch) => {
    dispatch(request());

    // Call service
    try {
      const response = await playerService.getPlayersByTeam(team, page);
      dispatch(success(response.data));
    } catch (error) {
      dispatch(failure(error));
    }
  };

  function request() {
    return { type: GET_PLAYERS_SEARCH_BY_TEAM_REQUEST };
  }
  function success(players) {
    return {
      type: GET_PLAYERS_SEARCH_BY_TEAM_SUCCESS,
      players,
    };
  }
  function failure(error) {
    return { type: GET_PLAYERS_SEARCH_BY_TEAM_FAILURE, error };
  }
}

export function searchPlayersByNameAction(search, order, page) {
  return async (dispatch) => {
    dispatch(request());

    // Call service
    try {
      const response = await playerService.getPlayersByName(
        search,
        order,
        page
      );
      const data = playerService.addId(response.data);
      dispatch(success(data));
    } catch (error) {
      dispatch(failure(error));
    }
  };

  function request() {
    return { type: GET_PLAYERS_SEARCH_BY_NAME_REQUEST };
  }
  function success(players) {
    return {
      type: GET_PLAYERS_SEARCH_BY_NAME_SUCCESS,
      players,
    };
  }
  function failure(error) {
    return { type: GET_PLAYERS_SEARCH_BY_TEAM_FAILURE, error };
  }
}
