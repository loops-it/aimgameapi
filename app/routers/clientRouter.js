import { Router } from "express";
import { createClient, getAllClients, getClientById, updateClient, deleteClient } from "../controllers/ClientController";
import { uploadProfilePhoto } from "../middleware/image-upload.middleware";
const router = Router();

router
  .route("/")
  .post(uploadProfilePhoto, createClient)
  .get(getAllClients);

router
  .route("/:id")
  .get(getClientById)
  .put(updateClient)
  .delete(deleteClient);

export default router;
