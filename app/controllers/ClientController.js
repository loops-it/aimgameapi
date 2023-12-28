import { validationException } from "../exception";
import { getAllClients, getClientById, createClient, updateClient, deleteClient } from "../services/ClientService";
import { string } from "joi";

export async function getAllClients(req, res, next) {
  try {
    const data = await getAllClients();
    res.status(200).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
}

export async function getClientById(req, res, next) {
  const { id } = req.params;
  try {
    if (!id) {
      throw new validationException("id is required");
    }
    const data = await getClientById(id);
    res.status(200).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
}

export async function createClient(req, res, next) {
  const clientValidationRules = {
    name: string().required(),
    address: string().required(),
    photo: string().allow("", null),
    industryTypeId: string().required(),
    email: string().email().required(),
    workspaceId: string().required(),
    phone: string().allow("", null),
  };

  const { body } = req;
  try {
    await validate(clientValidationRules, req);
    const data = await createClient(body);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}

export async function updateClient(req, res, next) {
  const { id } = req.params;
  const { body } = req;

  const clientValidationRules = {
    name: string().min(1).max(255).optional().allow(null), // Example: Ensure the name is between 1 and 255 characters
    address: string().optional().allow(null),
    photo: string().uri().optional().allow(null), // Assuming 'photo' is a URL
    industryTypeId: string().optional().allow(null),
    email: string().email().optional().allow(null),
    workspaceId: string().optional().allow(null),
    phone: string().optional().allow(null),
  };

  try {
    await validate(clientValidationRules, req);
    const data = await updateClient(id, body);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteClient(req, res, next) {
  const { id } = req.params;
  try {
    const data = await deleteClient(id);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
}
