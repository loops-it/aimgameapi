import e from "express";
import { notFoundException } from "../exception";
import ClientModel, { find, findById, findOne, findByIdAndUpdate, findByIdAndDelete } from "../models/client";
import { findOne as _findOne } from "../models/workspace";
import { findOne as __findOne } from "../models/industryType";
import { upload } from "../services/s3Service";
export async function getAllClients() {
  const clients = await find({});
  return clients;
}

export async function getClientById(id) {
  const client = await findById(id);
  return client;
}

export async function createClient(client) {
  const clientEmailExists = await findOne({
    email: client.email,
  });
  const workspaceIdExists = await _findOne({
    _id: client.workspaceId,
  });
  const industryTypeIdExists = await __findOne({
    _id: client.industryTypeId,
  });
  if (clientEmailExists) {
    console.log("Email already exists");
    throw new notFoundException("Email already exists");
  } else if (!workspaceIdExists) {
    console.log("Workspace not found");
    throw new notFoundException("Workspace not found");
  } else if (!industryTypeIdExists) {
    console.log("Industry Type not found");
    throw new notFoundException("Industry Type not found");
  } else {
    if (
      client.photo !== null &&
      client.photo !== undefined &&
      client.photo !== ""
    ) {
      const image = client.photo;
      const imageData = await upload(image, "clients");
      client.photo = imageData.Location;
    }
    const newClient = await new ClientModel(client).save();
    return newClient;
  }
}

export async function updateClient(id, client) {
  if (client.industryTypeId) {
    const workspaceIdExists = await _findOne({
      _id: client.workspaceId,
    });
    if (!industryTypeIdExists) {
      console.log("Industry Type not found");
      throw new notFoundException("Industry Type not found");
    }
  }
  if (client.workspaceId) {
    const industryTypeIdExists = await __findOne({
      _id: client.industryTypeId,
    });
    if (!workspaceIdExists) {
      console.log("Workspace not found");
      throw new notFoundException("Workspace not found");
    }
  }
  if (
    client.photo !== null &&
    client.photo !== undefined &&
    client.photo !== ""
  ) {
    const image = client.photo;
    const imageData = await upload(image, "clients");
    client.photo = imageData.Location;
  }
  const updatedClient = await findByIdAndUpdate(id, client, {
    new: true,
  });
  return updatedClient;
}

export async function deleteClient(id) {
  const deletedClient = await findByIdAndDelete(id);
  return deletedClient;
}
