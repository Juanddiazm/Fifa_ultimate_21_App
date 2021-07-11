import mongoose from "mongoose";
import config from "config";
import log from "../logger";

async function connect() {
  const dbUri = config.get("dbUri") as string;

  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);

  try {
    await mongoose.connect(dbUri);
    log.info("Database connected");
  } catch (error) {
    log.info(error);
    log.error("db error", error);
    process.exit(1);
  }
}

export default connect;
