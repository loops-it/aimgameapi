import e from "express";
import { notFoundException } from "../exception";
import FunnelStatusModel, { find, findById, findByIdAndUpdate, findByIdAndDelete } from "../models/funnelStatus";

export async function getAllFunnelStatuses() {
  const funnelStatuses = await find({});
  return funnelStatuses;
}

export async function getFunnelStatusById(id) {
  const funnelStatus = await findById(id);
  return funnelStatus;
}

export async function createFunnelStatus(funnelStatus) {
  const newFunnelStatus = await new FunnelStatusModel(funnelStatus).save();
  return newFunnelStatus;
}

export async function updateFunnelStatus(id, funnelStatus) {
  const updatedFunnelStatus = await findByIdAndUpdate(
    id,
    funnelStatus,
    { new: true }
  );
  return updatedFunnelStatus;
}

export async function deleteFunnelStatus(id) {
  const deletedFunnelStatus = await findByIdAndDelete(id);
  return deletedFunnelStatus;
}
