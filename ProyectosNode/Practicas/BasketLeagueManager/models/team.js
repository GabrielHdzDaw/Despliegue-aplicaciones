import { Schema, model } from "mongoose";

const rosterSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: "players",
    required: true,
  },
  joinDate: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  foundedAt: {
    type: Date,
  },
  roster: {
    type: [rosterSchema],
  },
});

export const Team = model("teams", teamSchema);
