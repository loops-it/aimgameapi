const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workspaceSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
    },
    industryTypeId: {
      type: Schema.Types.ObjectId,
      ref: "IndustryType",
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

workspaceSchema.virtual("client-workspace", {
  ref: "Client",
  localField: "_id",
  foreignField: "workspaceId",
});

module.exports = mongoose.model("Workspace", workspaceSchema);
