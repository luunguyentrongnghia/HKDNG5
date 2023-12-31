import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_error";

export const createRegistorSeller = async (req, res) => {
  try {
    const { id } = req.user;
    const { shop_name, Address, kind_shop } = req.body;
    if (req.file) {
      req.body.Image_shop = req.file.filename;
    }
    if (!(shop_name && Address && kind_shop)) throw new Error("Missing input");
    req.body.id_user = id;
    const response = await services.createRegistorSeller(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const deleteRegistorSeller = async (req, res) => {
  try {
    const { rsid } = req.params;
    const response = await services.deleteRegistorSeller(rsid);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getRegistorSellers = async (req, res) => {
  try {
    const response = await services.getRegistorSellers(req?.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
