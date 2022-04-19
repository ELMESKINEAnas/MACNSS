import jwt from "jsonwebtoken";
require("dotenv").config();

// generate tokens :
export const createToken = (payload = null) => {
  if (!payload) return null;
      return jwt.sign(payload, process.env.SECRET_KEY_ADMIN, {
        expiresIn: "1h",
      });

};

export const verifyToken = (token = null) => {
  if (!token) return null;
  try {
        return jwt.verify(token, process.env.SECRET_KEY_ADMIN);
  } catch (err) {
    return null;
  }
};
