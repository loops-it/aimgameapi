const express = require("express");
const clientController = require("../controllers/ClientController");
const { uploadProfilePhoto } = require("../middleware/image-upload.middleware");
const router = express.Router();

router
  .route("/")
  .post(uploadProfilePhoto, clientController.createClient)
  .get(clientController.getAllClients);

router
  .route("/:id")
  .get(clientController.getClientById)
  .put(clientController.updateClient)
  .delete(clientController.deleteClient);

module.exports = router;
