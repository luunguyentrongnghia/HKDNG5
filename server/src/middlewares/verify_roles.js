import { notAuth } from "./handle_error";
export const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "1") {
    return notAuth("Require role Admin", res);
  }
  next();
};
export const isSeller = (req, res, next) => {
  const { role } = req.user;
  if (role !== "2") {
    return notAuth("Require role Seller", res);
  }
  next();
};
