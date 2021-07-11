import {
  GET_PLAYERS_SEARCH_BY_TEAM_REQUEST,
  GET_PLAYERS_SEARCH_BY_TEAM_SUCCESS,
  GET_PLAYERS_SEARCH_BY_TEAM_FAILURE,
  GET_PLAYERS_SEARCH_BY_NAME_REQUEST,
  GET_PLAYERS_SEARCH_BY_NAME_SUCCESS,
  GET_PLAYERS_SEARCH_BY_NAME_FAILURE,
} from "../types";

const initialState = {
  playersSearchByTeam: {},
  playersSearchByName: {},
  loading: false,
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PLAYERS_SEARCH_BY_NAME_REQUEST:
    case GET_PLAYERS_SEARCH_BY_TEAM_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_PLAYERS_SEARCH_BY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        playersSearchByName: action.players,
        error: false,
      };
    case GET_PLAYERS_SEARCH_BY_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        playersSearchByTeam: action.players,
        error: false,
      };
    case GET_PLAYERS_SEARCH_BY_NAME_FAILURE:
    case GET_PLAYERS_SEARCH_BY_TEAM_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
