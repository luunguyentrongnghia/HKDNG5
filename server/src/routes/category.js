import * as controller from "../controllers";
import express from "express";
import verifytoken from "../middlewares/verify_token";
import { isAdmin, isSeller } from "../middlewares/verify_roles";

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
router.get("/", controller.getCategorys);
router.post(
  "/",
  [verifytoken, isAdmin],
  upload.single("image"),
  controller.createCategory
);
router.put(
  "/:cid",
  [verifytoken, isAdmin],
  upload.single("image"),
  controller.updateCategory
);
router.delete("/:cid", [verifytoken, isAdmin], controller.deleteCategory);
module.exports = router;
