const { Router } = require("express");
const uploadConfigs = require("../configs/upload");
const multer = require("multer");

const UsersControllers = require("../controllers/UsersControllers");
const UsersAvatarController = require("../controllers/UsersAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const upload = multer(uploadConfigs.MULTER);

const userRoutes = Router();

const usersControllers = new UsersControllers();
const usersAvatarController = new UsersAvatarController();

userRoutes.post("/", usersControllers.create);
userRoutes.put("/", ensureAuthenticated, usersControllers.update);
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  usersAvatarController.update
);

module.exports = userRoutes;
