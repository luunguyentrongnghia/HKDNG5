import db from "../models";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const createProduct = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.product.create({
        ...body,
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Created" : "Failed",
        productData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getProducts = ({
  page,
  limit,
  order,
  price,
  pricegte,
  pricegt,
  pricelt,
  pricelte,
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
      if (price) query.product_price = { [Op.between]: price };
      if (pricegte) query.product_price = { [Op.gte]: pricegte };
      if (pricegt) query.product_price = { [Op.gt]: pricegt };
      if (pricelt) query.product_price = { [Op.lt]: pricelt };
      if (pricelte) query.product_price = { [Op.lte]: pricelte };
      if (fields) {
        const splittedFields = fields.split(",");
        queries.attributes = {
          exclude: splittedFields,
        };
      }
      if (q) {
        query[Op.or] = [{ product_name: { [Op.substring]: q } }];
        query[Op.or] = [{ product_decs: { [Op.substring]: q } }];
      }
      const response = await db.product.findAndCountAll({
        where: query,
        ...queries,
        include: [
          {
            model: db.shop,
            as: "shop",
          },
          {
            model: db.category,
            as: "category",
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "product not found",
        productData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getProduct = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.product.findOne({
        where: { id: pid },
        include: [
          {
            model: db.shop,
            as: "shop",
          },
          {
            model: db.category,
            as: "category",
          },
        ],
      });

      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "product not found",
        productData: response,
      });
    } catch (error) {
      //reject giống hệt return
      reject(error);
    }
  });
export const updateProduct = (body, pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkImage = await db.product.findOne({
        where: { id: pid },
      });
      if (body?.product_image && checkImage.dataValues.product_image) {
        const imagePath = path.join(
          process.env.FILE_IMAGE,
          checkImage?.product_image
        );
        fs.unlinkSync(imagePath);
      }
      const response = await db.product.update(body, {
        where: { id: pid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes: response[0] > 0 ? "Updated." : "Failed",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
export const deleteProduct = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkImage = await db.product.findOne({
        where: { id: pid },
      });
      if (checkImage?.product_image) {
        const imagePath = path.join(
          process.env.FILE_IMAGE,
          checkImage?.product_image
        );
        fs.unlinkSync(imagePath);
      }
      const response = await db.product.destroy({
        where: { id: pid },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes: response > 0 ? "Deleted" : "Cannot delete",
      });
    } catch (error) {
      reject(error);
    }
  });
