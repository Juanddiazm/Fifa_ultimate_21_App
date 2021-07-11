import { Request, Response } from "express";
import { get } from "lodash";

import { findByQuery } from "../service/player.service";

const itemLimit = 10;
// Arrow function to find player by teamName using async/await with pagination
// data recive in body of request
// create a option object to save pagination data
// and return a promise
export const findPlayerByTeamName = async (req: Request, res: Response) => {
  const teamName = get(req, "body.Name");
  let page = get(req, "body.Page");
  // Validate if page is undefined
  if (!page) {
    page = 1;
  }
  // Eegular expresion to case insensitive teamName
  const regExp = new RegExp("^" + teamName.toLowerCase() + "$", "i");
  // Exclude attributes from player info
  const select = "-_id -id -team";
  // create a option object to save pagination data
  const options = {
    query: { team: { $regex: regExp } },
    page: page,
    limit: itemLimit,
    select: select,
  };

  let players = await findByQuery(options);
  // Verify if player is found
  if (!players) {
    return res.sendStatus(404);
  }

  // Build response
  let response = {
    Page: players.page,
    totalPages: players.totalPages,
    Items: players.docs? players.docs.length : 0,
    totalItems: players.totalDocs,
    Players: players.docs,
  };

  return res.send(response);
};

// Arrow function to find players by name using async/await with pagination
// Extract from params: search, order and page
// create a option object to save pagination data
// and return a promise
export const findPlayerByName = async (req: Request, res: Response) => {
  const search = get(req, "query.search");
  let order = get(req, "query.order");
  let page = get(req, "query.page");
  // Validate if page is undefined
  if (!page) {
    page = 1;
  }
  // Validate that order is undefined if is undefine set to "asc"
  if (!order) {
    order = "asc";
  }

  // Exclude attributes from player info
  const select = "-_id -id";

  // Eegular expresion to case insensitive teamName and not exact match
  const regExp = new RegExp("^" + search.toLowerCase(), "i");

  // create a option object to save pagination data
  const options = {
    query: { name: { $regex: regExp } },
    sort: { name: order },
    page: page,
    limit: itemLimit,
    select: select,
  };

  let players = await findByQuery(options);
  // Verify if player is found
  if (!players) {
    return res.sendStatus(404);
  }

  // Build response
  let response = {
    Page: players.page,
    totalPages: players.totalPages,
    Items: players.docs? players.docs.length : 0,
    totalItems: players.totalDocs,
    Players: players.docs,
  };

  return res.send(response);
};

// Function to prove API is working
export const healthcheck = async (req: Request, res: Response) => {
  return res.sendStatus(200);
};
