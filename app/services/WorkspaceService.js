import { notFoundException } from "../exception";
import WorkspaceModel, { find, findById, findByIdAndUpdate, findByIdAndDelete } from "../models/workspace";
import { findOne } from "../models/industryType";
export async function getAllWorkspaces() {
  const workspaces = await find({}).populate("industryTypeId");
  return workspaces;
}

export async function getWorkspaceById(id) {
  const workspace = await findById(id).populate(
    "industryTypeId"
  );
  return workspace;
}

export async function createWorkspace(workspace) {
  const industryTypeExists = await findOne({
    _id: workspace.industryTypeId,
  });
  if (industryTypeExists) {
    const newWorkspace = await new WorkspaceModel(workspace).save();
    return newWorkspace;
  } else {
    console.log("Industry Type not found");
    throw new notFoundException("Industry Type not found");
  }
}

export async function updateWorkspace(id, workspace) {
  const updatedWorkspace = await findByIdAndUpdate(
    id,
    workspace,
    { new: true }
  );
  return updatedWorkspace;
}

export async function deleteWorkspace(id) {
  const deletedWorkspace = await findByIdAndDelete(id);
  return deletedWorkspace;
}

export async function getWorkspaceByIndustryType(industryTypeId) {
  const workspace = await find({
    industryTypeId: industryTypeId,
  });
  return workspace;
}

export async function getWorkspaceBySubscription(subscription) {
  const workspace = await find({ subscription: subscription });
  return workspace;
}
