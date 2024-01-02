import user from "./user";
import registorseller from "./registorseller";
import shop from "./shop";
import category from "./category";
import product from "./product";
import { notfound } from "../middlewares/handle_error";
const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/registorseller", registorseller);
  app.use("/api/v1/shop", shop);
  app.use("/api/v1/category", category);
  app.use("/api/v1/product", product);
  app.use(notfound);
};

module.exports = initRoutes;
