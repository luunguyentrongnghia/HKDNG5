import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_error";
export const createShop = async (req, res) => {
  try {
    const { shop_name, Address, kind_shop, id_user } = req.body;

    if (!(shop_name && Address && kind_shop && id_user))
      throw new Error("Missing input");
    const response = await services.createShop({
      shop_name,
      Address,
      kind_shop,
      id_user,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getShops = async (req, res) => {
  try {
    const response = await services.getShops(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getshop = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.getshop(id);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const updateStatusShop = async (req, res) => {
  try {
    const { sid } = req.params;
    const { status } = req.body;
    if (!status) throw new Error("Missing input");
    const response = await services.updateShop(req.body, sid);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
export const updateShop = async (req, res) => {
  try {
    const { sid } = req.params;
    if (req.file) {
      req.body.Image_shop = req.file.filename;
    }
    const response = await services.updateShop(req.body, sid);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
export const deleteShop = async (req, res) => {
  try {
    const { sid } = req.params;
    if (!sid) throw new Error("Missing input");
    const response = await services.deleteShop(sid);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
