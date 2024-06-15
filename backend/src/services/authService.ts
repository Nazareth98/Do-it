import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export default class AuthService {
  static async decodeToken(token: string) {
    try {
      const secret: string = process.env.SECRET || "dev";
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error.message);
      return null;
    }
  }
}
