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
router.post("/", [verifytoken, isAdmin], controller.createShop);
router.get("/", [verifytoken, isAdmin], controller.getShops);
router.get("/getShop", [verifytoken, isAdmin], controller.getshop);
router.put(
  "/updateStatusShop/:sid",
  [verifytoken, isAdmin],
  controller.updateStatusShop
);
router.put(
  "/:sid",
  [verifytoken],
  upload.single("image"),
  controller.updateShop
);
router.delete("/:sid", [verifytoken, isAdmin], controller.deleteShop);
module.exports = router;
