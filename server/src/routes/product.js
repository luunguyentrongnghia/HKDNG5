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

router.get("/", controller.getProducts);
router.post(
  "/",
  [verifytoken],
  upload.single("image"),
  controller.createProduct
);
router.get("/:pid", controller.getProduct);
router.put(
  "/:pid",
  [verifytoken],
  upload.single("image"),
  controller.updateProduct
);
router.delete("/:pid", [verifytoken], controller.deleteProduct);
module.exports = router;
