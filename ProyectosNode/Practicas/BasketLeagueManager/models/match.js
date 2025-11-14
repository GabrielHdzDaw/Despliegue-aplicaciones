import { Schema, model } from "mongoose";

const playerStatsSchema = new Schema({
  player: {
    type: Schema.type.ObjectId,
    ref: "players",
  },
  team: {
    type: Schema.type.ObjectId,
    ref: "teams",
  },
  points: {
    type: Number,
  },
  rebounds: {
    type: Number,
  },
  assists: {
    type: Number,
  },
  steals: {
    type: Number,
  },
  fouls: {
    type: Number,
  },
  mvp: {
    type: Boolean,
  },
});

const matchSchema = new Schema({
  tournament: {
    type: Schema.Types.ObjectId,
    ref: "tournaments",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  stage: {
    type: String,
    required: true,
    enum: ["Group", "Quarterfinal", "Semifinal", "Final"],
  },
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: "teams",
    required: true,
  },
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: "teams",
    required: true,
    validate: {
      validator: function (value) {
        return value.toString() !== this.homeTeam.toString();
      },
      message: "El equipo visitante debe ser distinto del equipo local.",
    },
  },
  homeScore: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "El marcador del equipo local debe ser mayor o igual a 0.",
    },
  },
  awayScore: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "El marcador del equipo visitante debe ser mayor o igual a 0.",
    },
  },

  playerStats: {
    type: [Schema.type.ObjectId],
    ref: "playerStats",
  },
});

matchSchema.index({ tournament: 1, date: 1, homeTeam: 1, awayTeam: 1 }, { unique: true });

export const Match = model("matches", matchSchema);
