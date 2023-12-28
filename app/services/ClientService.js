const e = require("express");
const { notFoundException } = require("../exception");
const ClientModel = require("../models/client");
const WorkspaceModel = require("../models/workspace");
const IndustryTypeModel = require("../models/industryType");
const s3service = require("../services/s3Service");
exports.getAllClients = async () => {
  const clients = await ClientModel.find({});
  return clients;
};

exports.getClientById = async (id) => {
  const client = await ClientModel.findById(id);
  return client;
};

exports.createClient = async (client) => {
  const clientEmailExists = await ClientModel.findOne({
    email: client.email,
  });
  const workspaceIdExists = await WorkspaceModel.findOne({
    _id: client.workspaceId,
  });
  const industryTypeIdExists = await IndustryTypeModel.findOne({
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
      const imageData = await s3service.upload(image, "clients");
      client.photo = imageData.Location;
    }
    const newClient = await new ClientModel(client).save();
    return newClient;
  }
};

exports.updateClient = async (id, client) => {
  if (client.industryTypeId) {
    const workspaceIdExists = await WorkspaceModel.findOne({
      _id: client.workspaceId,
    });
    if (!industryTypeIdExists) {
      console.log("Industry Type not found");
      throw new notFoundException("Industry Type not found");
    }
  }
  if (client.workspaceId) {
    const industryTypeIdExists = await IndustryTypeModel.findOne({
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
    const imageData = await s3service.upload(image, "clients");
    client.photo = imageData.Location;
  }
  const updatedClient = await ClientModel.findByIdAndUpdate(id, client, {
    new: true,
  });
  return updatedClient;
};

exports.deleteClient = async (id) => {
  const deletedClient = await ClientModel.findByIdAndDelete(id);
  return deletedClient;
};
