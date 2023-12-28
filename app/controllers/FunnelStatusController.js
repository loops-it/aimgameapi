import { validationException } from "../exception";
import { getAllFunnelStatuses, getFunnelStatusById, createFunnelStatus, updateFunnelStatus, deleteFunnelStatus } from "../services/FunnelStatusService";
import { string, number } from "joi";

export async function getAllFunnelStatuses(req, res, next) {
  try {
    const data = await getAllFunnelStatuses();
    res.status(200).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
}

export async function getFunnelStatusById(req, res, next) {
  const { id } = req.params;
  try {
    if (!id) {
      throw new validationException("id is required");
    }
    const data = await getFunnelStatusById(id);
    res.status(200).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
}

export async function createFunnelStatus(req, res, next) {
  const funnelStatusValidationRules = {
    status: string().required(),
    stage: string().required(),
    rate: string().required(),
    level: number().required(),
    order: number().required(),
  };

  const { body } = req;
  try {
    await validate(funnelStatusValidationRules, req);
    const data = await createFunnelStatus(body);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}

export async function updateFunnelStatus(req, res, next) {
  const { id } = req.params;
  const { body } = req;

  const funnelStatusValidationRules = {
    status: string(),
    stage: string(),
    rate: string(),
    level: number(),
    order: number(),
  };

  try {
    await validate(funnelStatusValidationRules, req);
    const data = await updateFunnelStatus(id, body);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteFunnelStatus(req, res, next) {
  const { id } = req.params;
  try {
    const data = await deleteFunnelStatus(id);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}
