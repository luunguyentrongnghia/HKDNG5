import db from "../models";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";
export const createRegistorSeller = (body) =>
  new Promise(async (resolve, reject) => {
    // console.log(email, password);
    try {
      const checkUser = await db.User.findOne({
        where: {
          id: body.id_user,
        },
      });
      const checkRegistorSeller = await db.registor_seller.findOne({
        where: {
          id_user: body.id_user,
        },
      });
      if (!checkUser) {
        resolve({
          err: 1,
          mes: "User not found",
        });
        return;
      }
      if (checkRegistorSeller) {
        resolve({
          err: 1,
          mes: "Bạn đã đăng ký vui lòng chờ phản hồi",
        });
        return;
      }
      // console.log(body);
      const response = await db.registor_seller.create({
        ...body,
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Created" : "Failed",
        RegistorSellerData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deleteRegistorSeller = (rsid) =>
  new Promise(async (resolve, reject) => {
    // console.log(email, password);
    try {
      const checkImage = await db.registor_seller.findOne({
        where: { idregistor_seller: rsid },
      });
      if (checkImage?.Image_shop) {
        const imagePath = path.join(
          process.env.FILE_IMAGE,
          checkImage?.Image_shop
        );
        fs.unlinkSync(imagePath);
      }
      const response = await db.registor_seller.destroy({
        where: { idregistor_seller: rsid },
      });
      //resolve giống như return nhưng ở dươi resolve có thể viết code dc
      resolve({
        err: response > 0 ? 0 : 1,
        mes: response > 0 ? "deleted" : "cannot delete ",
      });
    } catch (error) {
      //reject giống hệt return
      reject(error);
    }
  });
export const getRegistorSellers = ({
  page,
  limit,
  order,
  fields,
  q,
  ...query
}) =>
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
      const response = await db.registor_seller.findAndCountAll({
        where: query,
        ...queries,
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
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "registor seller not found",
        registorSellerData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
