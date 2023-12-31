import Jwt, { decode, TokenExpiredError } from "jsonwebtoken";
import { badRequest, notAuth } from "./handle_error";
const verify_token = (req, res, next) => {
  const token = req?.headers?.authorization;
  if (!token) {
    return notAuth("Require authorization", res);
  }
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const accessToken = token.split(" ")[1];
    Jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        const isChecked = err instanceof TokenExpiredError;

        if (!isChecked) {
          return notAuth("Access token invalid", res, isChecked);
        }
        if (isChecked) {
          return notAuth("Access token expired", res, isChecked);
        }
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      err: 1,
      mes: "ko phải token xác thực",
    });
  }
};

export default verify_token;
