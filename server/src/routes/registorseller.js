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
const upload = multer({ storage: storage });
const router = express.Router();
router.get("/", [verifytoken, isAdmin], controller.getRegistorSellers);
router.post(
  "/",
  [verifytoken],
  upload.single("image"),
  controller.createRegistorSeller
);
router.delete(
  "/:rsid",
  [verifytoken, isAdmin],
  controller.deleteRegistorSeller
);
module.exports = router;
