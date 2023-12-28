import e from "express";
import IndustryTypeModel, { find, findById, findByIdAndUpdate, findByIdAndDelete } from "../models/industryType";

export async function getAllIndustryTypes() {
  const industryTypes = await find({});
  return industryTypes;
}

export async function getIndustryTypeById(id) {
  const industryType = await findById(id);
  return industryType;
}

export async function createIndustryType(industryType) {
  const newIndustryType = await new IndustryTypeModel(industryType).save();
  return newIndustryType;
}

export async function updateIndustryType(id, industryType) {
  const updatedIndustryType = await findByIdAndUpdate(
    id,
    industryType,
    { new: true }
  );
  return updatedIndustryType;
}

export async function deleteIndustryType(id) {
  const deletedIndustryType = await findByIdAndDelete(id);
  return deletedIndustryType;
}
