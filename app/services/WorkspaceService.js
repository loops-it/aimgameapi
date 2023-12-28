const { notFoundException } = require("../exception");
const WorkspaceModel = require("../models/workspace");
const IndustryTypeModel = require("../models/industryType");
exports.getAllWorkspaces = async () => {
  const workspaces = await WorkspaceModel.find({}).populate("industryTypeId");
  return workspaces;
};

exports.getWorkspaceById = async (id) => {
  const workspace = await WorkspaceModel.findById(id).populate(
    "industryTypeId"
  );
  return workspace;
};

exports.createWorkspace = async (workspace) => {
  const industryTypeExists = await IndustryTypeModel.findOne({
    _id: workspace.industryTypeId,
  });
  if (industryTypeExists) {
    const newWorkspace = await new WorkspaceModel(workspace).save();
    return newWorkspace;
  } else {
    console.log("Industry Type not found");
    throw new notFoundException("Industry Type not found");
  }
};

exports.updateWorkspace = async (id, workspace) => {
  const updatedWorkspace = await WorkspaceModel.findByIdAndUpdate(
    id,
    workspace,
    { new: true }
  );
  return updatedWorkspace;
};

exports.deleteWorkspace = async (id) => {
  const deletedWorkspace = await WorkspaceModel.findByIdAndDelete(id);
  return deletedWorkspace;
};

exports.getWorkspaceByIndustryType = async (industryTypeId) => {
  const workspace = await WorkspaceModel.find({
    industryTypeId: industryTypeId,
  });
  return workspace;
};

exports.getWorkspaceBySubscription = async (subscription) => {
  const workspace = await WorkspaceModel.find({ subscription: subscription });
  return workspace;
};
