import mongoose from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export interface PlayerDocument extends mongoose.Document {
  id: string;
  name: string;
  position: string;
  nation: string;
  team: string;
}

const PlayerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  nation: { type: String, required: true },
  team: { type: String, required: true },
});

 PlayerSchema.plugin(mongoosePagination);


const Player = mongoose.model<PlayerDocument, Pagination<PlayerDocument> >("Player", PlayerSchema, "player");

export default Player;

