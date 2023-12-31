import * as controller from "../controllers";
import express from "express";
import verifytoken from "../middlewares/verify_token";
import { isAdmin, isCreatorOrAdmin } from "../middlewares/verify_roles";
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FILE_IMAGE);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20 },
});
const router = express.Router();
router.get("/", [verifytoken, isAdmin], controller.getUsers);
router.post("/register", controller.register);
router.get("/current", [verifytoken], controller.getCurrent);
router.post("/login", controller.login);
router.post("/forgotpassword", controller.forgotPassword);
router.put("/resetpassword", controller.resetPassword);
router.put(
  "/current",
  [verifytoken],
  upload.single("image"),
  controller.updateCurrent
);
router.put("/:uid", [verifytoken], controller.updateUser);
router.delete("/:uid", [verifytoken, isAdmin], controller.deleteUsers);
router.put("/finalregister/:token", controller.finalregister);
module.exports = router;
