const { validationException } = require("../exception");
const clientService = require("../services/ClientService");
const Joi = require("joi");

exports.getAllClients = async (req, res, next) => {
  try {
    const data = await clientService.getAllClients();
    res.status(200).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
};

exports.getClientById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new validationException("id is required");
    }
    const data = await clientService.getClientById(id);
    res.status(200).json({ success: true, status: 200, data });
  } catch (error) {
    next(error);
  }
};

exports.createClient = async (req, res, next) => {
  const clientValidationRules = {
    name: Joi.string().required(),
    address: Joi.string().required(),
    photo: Joi.string().allow("", null),
    industryTypeId: Joi.string().required(),
    email: Joi.string().email().required(),
    workspaceId: Joi.string().required(),
    phone: Joi.string().allow("", null),
  };

  const { body } = req;
  try {
    await validate(clientValidationRules, req);
    const data = await clientService.createClient(body);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
};

exports.updateClient = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const clientValidationRules = {
    name: Joi.string().min(1).max(255).optional().allow(null), // Example: Ensure the name is between 1 and 255 characters
    address: Joi.string().optional().allow(null),
    photo: Joi.string().uri().optional().allow(null), // Assuming 'photo' is a URL
    industryTypeId: Joi.string().optional().allow(null),
    email: Joi.string().email().optional().allow(null),
    workspaceId: Joi.string().optional().allow(null),
    phone: Joi.string().optional().allow(null),
  };

  try {
    await validate(clientValidationRules, req);
    const data = await clientService.updateClient(id, body);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
};

exports.deleteClient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await clientService.deleteClient(id);
    res.status(201).json({ success: true, status: 201, data });
  } catch (error) {
    next(error);
  }
};
