import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { extractData } from "./utils/extractData";
import helmet from "helmet";
import cors from "cors";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set all routes from routes folder
app.use("/", routes);

app.listen(port, async () => {
  log.info(`Server listing at http://${host}:${port}`);
  // Extract data and save in database
  await extractData();
  // Connect to database
  await connect();
});
