import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const funnelStatusSchema = Schema(
  {
    status: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("FunnelStatus", funnelStatusSchema);
