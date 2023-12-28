import { validationException } from "../exception";
import { getAllWorkspaces, getWorkspaceById, createWorkspace, updateWorkspace, deleteWorkspace, getWorkspaceByIndustryType, getWorkspaceBySubscription } from "../services/WorkspaceService";
import { string } from "joi";

export async function getAllWorkspaces(req, res, next) {
  try {
    const data = await getAllWorkspaces();
    res.status(200).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
}

export async function getWorkspaceById(req, res, next) {
  const { id } = req.params;
  try {
    if (!id) {
      throw new validationException("id is required");
    }
    const data = await getWorkspaceById(id);
    res.status(200).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
}

export async function createWorkspace(req, res, next) {
  const workspaceValidationRules = {
    name: string().required(),
    address: string().required(),
    subscription: string().required(),
    industryTypeId: string().required(),
    contactEmail: string().email().required(),
  };

  const { body } = req;
  try {
    await validate(workspaceValidationRules, req);
    const data = await createWorkspace(body);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}

export async function updateWorkspace(req, res, next) {
  const { id } = req.params;
  const { body } = req;
  const workspaceValidationRules = {
    name: string(),
    address: string(),
    subscription: string(),
    industryTypeId: string(),
    contactEmail: string().email(),
  };
  try {
    await validate(workspaceValidationRules, req);
    const data = await updateWorkspace(id, body);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteWorkspace(req, res, next) {
  const { id } = req.params;
  try {
    const data = await deleteWorkspace(id);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}

export async function getWorkspaceByIndustryType(req, res, next) {
  const { industryTypeId } = req.params;
  try {
    if (!industryTypeId) {
      throw new validationException("industryTypeId is required");
    }
    const data = await getWorkspaceByIndustryType(
      industryTypeId
    );
    res.status(200).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
}

export async function getWorkspaceBySubscription(req, res, next) {
  const { subscription } = req.params;
  try {
    if (!subscription) {
      throw new validationException("subscription is required");
    }
    const data = await getWorkspaceBySubscription(
      subscription
    );
    res.status(200).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
}
