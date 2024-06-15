import dotenv from "dotenv";
dotenv.config();

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default class AuthController {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: 401, message: "Acesso negado!" });
    }
    try {
      const secret: string = process.env.SECRET || "dev";
      jwt.verify(token, secret);
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, message: "Token inválido!" });
    }
  }
}
