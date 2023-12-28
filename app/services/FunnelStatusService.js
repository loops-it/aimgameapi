const e = require("express");
const { notFoundException } = require("../exception");
const FunnelStatusModel = require("../models/funnelStatus");

exports.getAllFunnelStatuses = async () => {
  const funnelStatuses = await FunnelStatusModel.find({});
  return funnelStatuses;
};

exports.getFunnelStatusById = async (id) => {
  const funnelStatus = await FunnelStatusModel.findById(id);
  return funnelStatus;
};

exports.createFunnelStatus = async (funnelStatus) => {
  const newFunnelStatus = await new FunnelStatusModel(funnelStatus).save();
  return newFunnelStatus;
};

exports.updateFunnelStatus = async (id, funnelStatus) => {
  const updatedFunnelStatus = await FunnelStatusModel.findByIdAndUpdate(
    id,
    funnelStatus,
    { new: true }
  );
  return updatedFunnelStatus;
};

exports.deleteFunnelStatus = async (id) => {
  const deletedFunnelStatus = await FunnelStatusModel.findByIdAndDelete(id);
  return deletedFunnelStatus;
};
