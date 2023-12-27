const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Client", clientSchema);
