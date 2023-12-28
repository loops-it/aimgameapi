import { string, boolean } from "joi";
import { getAllIndustryTypes, getIndustryTypeById, createIndustryType, updateIndustryType, deleteIndustryType } from "../services/IndustryTypeService";

export async function getAllIndustryTypes(req, res, next) {
  try {
    const data = await getAllIndustryTypes();
    res.status(201).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
}

export async function getIndustryTypeById(req, res, next) {
  const { id } = req.params;
  try {
    const data = await getIndustryTypeById(id);
    res.status(201).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
}

export async function createIndustryType(req, res, next) {
  const { body } = req;
  const industryTypeValidationRules = {
    name: string().required(),
    isActive: boolean().required(),
  };
  try {
    await validate(industryTypeValidationRules, req);
    const data = await createIndustryType(body);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}

export async function updateIndustryType(req, res, next) {
  const { id } = req.params;
  const { body } = req;
  const industryTypeValidationRules = {
    name: string(),
    isActive: boolean(),
  };
  try {
    await validate(industryTypeValidationRules, req);
    const data = await updateIndustryType(id, body);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteIndustryType(req, res, next) {
  const { id } = req.params;
  try {
    const data = await deleteIndustryType(id);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}
