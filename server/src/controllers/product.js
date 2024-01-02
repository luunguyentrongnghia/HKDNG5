import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_error";

export const createProduct = async (req, res) => {
  try {
    const { product_name, product_price, product_decs, id_shop, category_id } =
      req.body;
    if (req.file) {
      req.body.product_image = req.file.filename;
    }
    if (
      !product_name &&
      !product_price &&
      !product_decs &&
      !id_shop &&
      !category_id
    )
      throw new Error("Missing input");
    const response = await services.createProduct(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getProducts = async (req, res) => {
  try {
    const response = await services.getProducts(req?.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await services.getProduct(pid);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (req.file) {
      req.body.product_image = req.file.filename;
    }
    const response = await services.updateProduct(req.body, pid);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await services.deleteProduct(pid);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
