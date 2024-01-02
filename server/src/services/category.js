import db from "../models";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";
export const createCategory = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const existingCategory = await db.category.findOne({
        where: {
          category_name: body.category_name,
        },
      });
      if (existingCategory) {
        resolve({
          err: 1,
          mes: "Danh mục đã tồn tại",
        });
        return;
      }
      const response = await db.category.create({
        ...body,
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Created" : "Failed",
        categoryData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getCategorys = ({ page, limit, order, fields, q, ...query }) =>
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
        query[Op.or] = [{ category_name: { [Op.substring]: q } }];
      }
      const response = await db.category.findAndCountAll({
        where: query,
        ...queries,
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "category not found",
        categoryData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deleteCategory = (cid) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkImage = await db.category.findOne({
        where: {
          id: cid,
        },
      });
      if (checkImage?.category_image) {
        const imagePath = path.join(
          process.env.FILE_IMAGE,
          checkImage?.category_image
        );
        fs.unlinkSync(imagePath);
      }
      const response = await db.category.destroy({
        where: { id: cid },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes: response > 0 ? "Deleted" : "Cannot delete",
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateCategory = (body, cid) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkImage = await db.category.findOne({
        where: { id: cid },
      });
      if (body?.category_image && checkImage.dataValues.category_image) {
        const imagePath = path.join(
          process.env.FILE_IMAGE,
          checkImage?.category_image
        );
        fs.unlinkSync(imagePath);
      }
      const response = await db.category.update(body, {
        where: { id: cid },
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
