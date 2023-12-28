import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const industryTypeSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

industryTypeSchema.virtual("workspace-industryType", {
  ref: "Workspace",
  localField: "_id",
  foreignField: "industryTypeId",
});

industryTypeSchema.virtual("client-industryType", {
  ref: "Client",
  localField: "_id",
  foreignField: "industryTypeId",
});

export default model("IndustryType", industryTypeSchema);
