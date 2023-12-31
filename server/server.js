import express from "express";
import cors from "cors";
import initRoutes from "./src/routes";
require("dotenv").config();
require("./connection_database");
const path = require("path");
const fs = require("fs");
const app = express();

const imagePath = path.join(process.env.FILE_IMAGE);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePathFull = path.join(imagePath, imageName);
  fs.readFile(imagePathFull, (err, data) => {
    if (err) {
      res.status(404).send("Not Found");
    } else {
      res.contentType("image/jpeg").end(data);
    }
  });
});
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
initRoutes(app);

const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
  console.log("Server is listening on port " + listener.address().port);
});
