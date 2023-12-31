import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_error";
import Joi from "joi";
import { sendMail } from "../ultils/sendMail";
import makeToken from "uniqid";
import { email, Passwords } from "../helpers/joi_schema";
export const register = async (req, res) => {
  try {
    const { email, Passwords, Name, SDT } = req.body;
    if (!email || !Passwords || !Name || !SDT) {
      return res.status(400).json({
        err: 1,
        mes: "Missing inputs",
      });
    }
    const checkMail = await services.checkMail({ email });
    if (checkMail?.err === 0) {
      return res.json({
        err: 1,
        mes: "User has existed",
      });
    } else {
      const token = Math.floor(Math.random() * 900000) + 100000;
      const emailedited = btoa(email) + "@" + token;
      const newUser = await services.newUser({
        email: emailedited,
        Passwords,
        Name,
        SDT,
        otp: token,
      });
      if (newUser.err === 0) {
        const html = `<h2>Register code:</h2><br/><blockquote>${token}</blockquote>`;
        await sendMail({
          email,
          html,
          subject: "hoàn tất đăng ký ",
        });
      }
      setTimeout(async () => {
        await services.deleteEmail(emailedited);
      }, [300000]);
      return res.json(newUser);
    }
  } catch (error) {
    return internalServerError(res);
  }
};
export const finalregister = async (req, res) => {
  try {
    // const cookie = req.cookies;
    const { token } = req.params;
    const notActivedEmail = await services.notActivedEmail(token);
    if (notActivedEmail.err === 0) {
      await services.updateUser(notActivedEmail?.mes?.id, {
        email: atob(notActivedEmail?.mes?.email?.split("@")[0]),
      });
      const getuser = await services.getCurrent(notActivedEmail?.mes?.id);

      return res.json({
        err: getuser.err === 0 ? 0 : 1,
        mes:
          getuser.err === 0
            ? "Register is successfully.Please go login."
            : "something went wrong,please try later",
      });
    }
    return res.json({ err: 1 });
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const login = async (req, res) => {
  try {
    const { error } = Joi.object({ email, Passwords }).validate(req.body);
    if (error) {
      return badRequest(error.details[0]?.message, res);
    }
    const response = await services.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getUsers = async (req, res) => {
  try {
    const response = await services.getUsers(req.query);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const deleteUsers = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) throw new Error("Missing input");
    const response = await services.deleteUsers(uid);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getCurrent = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.getCurrent(id);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Missing email");
    const response = await services.forgotPassword(email);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    if (!password || !token) throw new Error("Missing input");
    const response = await services.resetPassword(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const updateCurrent = async (req, res) => {
  try {
    const { id } = req.user;
    if (req.file) {
      req.body.imgUS = req.file.filename;
    }
    const response = await services.updateUser(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    if (req.file) {
      req.body.imgUS = req.file.filename;
    }
    const response = await services.updateUser(uid, req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
