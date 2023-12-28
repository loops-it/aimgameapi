import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const clientSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    industryTypeId: {
      type: Schema.Types.ObjectId,
      ref: "IndustryType",
      required: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Client", clientSchema);
