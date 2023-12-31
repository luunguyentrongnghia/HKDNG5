import db from "../models";
import { v4 as generateId } from "uuid";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import Jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../ultils/sendMail";
import path from "path";
import fs from "fs";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const checkMail = ({ email }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
      });
      resolve({
        err: response ? 0 : 1,
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
export const notActivedEmail = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: {
          email: {
            [Op.endsWith]: token,
          },
        },
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? response : "something went wrong",
      });
    } catch (error) {
      console.log(error);

      reject(error);
    }
  });
export const newUser = ({ email, Passwords, Name, SDT, otp }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.create({
        SDT: SDT,
        Name,
        email: email,
        Passwords: Passwords,
        otp,
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Register is successful" : "something went wrong",
      });
    } catch (error) {
      console.log(error);

      reject(error);
    }
  });
export const updateUser = (userId, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const checkImage = await db.User.findOne({
        where: { id: userId },
      });
      if (body.imgUS && checkImage.imgUS) {
        const imagePath = path.join(process.env.FILE_IMAGE, checkImage?.imgUS);
        fs.unlinkSync(imagePath);
      }
      const response = await db.User.update(body, {
        where: { id: userId },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} user updated`
            : "some thing went wrong",
      });
    } catch (error) {
      reject(error);
    }
  });
export const getCurrent = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: db.registor_seller,
            as: "registorSeller",
          },
          {
            model: db.shop,
            as: "shop",
          },
        ],
        attributes: {
          exclude: ["Passwords", "refreshToken"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "User not found",
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deleteEmail = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.destroy({
        where: { email: email },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} user deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
export const login = ({ email, Passwords }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: {
          email,
          Passwords,
        },
        raw: true,
      });

      const accessToken = Jwt.sign(
        {
          id: response.id,
          email: response.email,
          role: response.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      const refreshToken = Jwt.sign(
        {
          id: response.id,
        },
        process.env.JWT_SECRET_REFRESH_TOKEN,
        { expiresIn: "7d" }
      );

      resolve({
        err: accessToken ? 0 : 1,
        mes: accessToken
          ? "Login is successful"
          : response
          ? "password is wrong"
          : "email has been registered",
        access_token: accessToken ? `Bearer ${accessToken}` : accessToken,
        refreshToken: refreshToken,
        userData: accessToken
          ? {
              id: response.id,
              email: response.email,
              Address: response.Address,
              Name: response.Name,
              SDT: response.SDT,
            }
          : "",
      });
      if (refreshToken) {
        await db.User.update(
          {
            refreshToken: refreshToken,
          },
          {
            where: {
              id: response.id,
            },
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
export const getUsers = ({ page, limit, order, fields, Name, q, ...query }) =>
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
      if (Name) query.Name = { [Op.substring]: Name };
      if (fields) {
        const splittedFields = fields.split(",");
        queries.attributes = {
          exclude: splittedFields,
        };
      }
      if (q) {
        query[Op.or] = [
          { Name: { [Op.substring]: q } },
          { email: { [Op.substring]: q } },
        ];
      }
      const response = await db.User.findAndCountAll({
        where: query,
        ...queries,
        attributes: {
          exclude: ["Passwords", "refreshToken"],
        },
        include: [
          {
            model: db.CartList,
            as: "cart",
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deleteUsers = (uid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.destroy({
        where: { id: uid },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} user deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
export const forgotPassword = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const User = await db.User.findOne({ where: { email } });
      if (!User) {
        resolve({
          err: 1,
          mes: "User not found",
        });
      }
      const resetToken = crypto.randomBytes(32).toString("hex");
      await db.User.update(
        {
          passwordResetToken: crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex"),
          passwordResetExpires: Date.now() + 15 * 60 * 1000,
        },
        {
          where: { email },
        }
      );
      const html = `Xin vui long click vào link dưới đây để thay đổi mật khẩu của bạn.link này sẽ hết hạn sau 15 phut kể từ bây giờ. <a href= ${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;
      const data = {
        email,
        html,
        subject: "forgot password",
      };
      const rs = await sendMail(data);
      resolve({
        err: rs.response.includes("OK") ? 0 : 1,
        mes: rs.response.includes("OK")
          ? "Hảy kiểm tra mail của bạn"
          : "Đã có lổi,hảy thử lại",
      });
    } catch (error) {
      reject(error);
    }
  });
export const resetPassword = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const passwordResetToken = crypto
        .createHash("sha256")
        .update(data.token)
        .digest("hex");
      const user = await db.User.update(
        {
          Passwords: data.password,
          passwordResetToken: null,
          passwordResetExpires: null,
          passwordChangedAt: Date.now(),
        },
        {
          where: {
            passwordResetToken,
            passwordResetExpires: { [Op.gt]: Date.now() },
          },
        }
      );
      console.log(user);
      resolve({
        err: user[0] > 0 ? 0 : 1,
        mes: user[0] > 0 ? "Updated password" : "Something went wrong",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
