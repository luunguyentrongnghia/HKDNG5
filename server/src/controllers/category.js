import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_error";
export const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    if (req.file) {
      req.body.category_image = req.file.filename;
    }
    if (!category_name) throw new Error("Missing input");
    const response = await services.createCategory(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getCategorys = async (req, res) => {
  try {
    const response = await services.getCategorys(req?.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { cid } = req.params;
    if (req.file) {
      req.body.category_image = req.file.filename;
    }
    const response = await services.updateCategory(req.body, cid);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await services.deleteCategory(cid);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
