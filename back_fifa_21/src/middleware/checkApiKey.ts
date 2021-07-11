import { Request, Response, NextFunction } from "express";

export const checkApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  const apiKey = <string>req.header("ApiKey");
  if (apiKey && apiKey == process.env.API_KEY) {
    next();
  } else {
    //If apiKey is not valid, respond with 401 (unauthorized)
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
};
