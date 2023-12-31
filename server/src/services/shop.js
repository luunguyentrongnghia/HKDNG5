import db from "../models";
import { Op } from "sequelize";
export const createShop = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkUser = await db.User.findOne({
        where: {
          id: body.id_user,
        },
      });
      if (!checkUser) {
        resolve({
          err: 1,
          mes: "User not found",
        });
      }
      const response = await db.shop.create({
        ...body,
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Created" : "Failed",
        shopData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateShop = (body, sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkImage = await db.shop.findOne({
        where: { id: sid },
      });
      if (body.Image_shop && checkImage.Image_shop) {
        const imagePath = path.join(
          process.env.FILE_IMAGE,
          checkImage?.Image_shop
        );
        fs.unlinkSync(imagePath);
      }
      const response = await db.shop.update(body, {
        where: { id: sid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes: response[0] > 0 ? "Updated." : "Failed",
      });
    } catch (error) {
      reject(error);
    }
  });
export const getShops = ({ page, limit, order, fields, q, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      if (order) {
        const orders = order.split(",").map((item) => item.split(":"));
        queries.order = orders.map(([field, order]) => [
          field,
          order.toUpperCase(),
        ]);
      }
      if (fields) {
        const splittedFields = fields.split(",");
        queries.attributes = {
          exclude: splittedFields,
        };
      }
      if (q) {
        query[Op.or] = [
          { shop_name: { [Op.substring]: q } },
          { kind_shop: { [Op.substring]: q } },
        ];
      }
      const response = await db.shop.findAndCountAll({
        where: query,
        include: [
          {
            model: db.User,
            as: "User",
            attributes: {
              exclude: [
                "Passwords",
                "refreshToken",
                "passwordChangedAt",
                "SDT",
                "createdAt",
                "otp",
                "passwordChangedAt",
                "passwordResetExpires",
                "passwordResetToken",
                "role",
                "updatedAt",
              ],
            },
          },
        ],
        ...queries,
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "shop not found",
        shopData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getshop = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.shop.findOne({
        where: {
          id_user: userId,
        },
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "shop not found",
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deleteShop = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkShop = await db.shop.findOne({
        where: {
          id: sid,
        },
      });
      if (!checkShop) {
        resolve({
          err: 1,
          mes: "Shop not found",
        });
        return;
      }
      if (checkShop?.Image_shop) {
        const imagePath = path.join(
          process.env.FILE_IMAGE,
          checkImage?.Image_shop
        );
        fs.unlinkSync(imagePath);
      }
      const checkUser = await db.User.findOne({
        where: {
          id: checkShop.id_user,
        },
      });
      if (checkUser) {
        await db.User.update(
          { role: "3" },
          {
            where: { id: checkUser.id },
          }
        );
      }
      const response = await db.shop.destroy({
        where: { id: sid },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes: response > 0 ? "Deleted" : "Cannot delete",
      });
    } catch (error) {
      reject(error);
    }
  });
