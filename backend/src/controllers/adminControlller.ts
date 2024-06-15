import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import AdminUseCase from "../useCases/adminUseCase";
import AdminService from "../services/adminService";
import AuthUseCase from "../useCases/authUseCase";
import { AdminType } from "../types/adminTypes";
import AdminRepository from "../repositories/adminRepository";

export default class AdminControlller {
  static async login(req: Request, res: Response) {
    const body: AdminType = req.body;
    try {
      AuthUseCase.validateFieldsLogin(body);
      const admin = await AdminRepository.getByUsername(body.username);
      if (!admin) {
        return res.status(400).json({
          status: 400,
          message: "Não localizamos esse Nome de Usuário.",
        });
      }
      await AdminUseCase.checkPasswordMatch(admin, body.password);
      const secret: string = process.env.SECRET || "dev";
      const token = jwt.sign(
        {
          id: admin.id,
          name: admin.name,
          username: admin.username,
          type: "admin",
        },
        secret
      );

      return res.status(200).json({
        status: 200,
        message: "Login realizado com sucesso!",
        token,
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    const body = req.body;
    try {
      AdminUseCase.validateFields(body);
      await AdminService.checkUsernameExists(body);
      body.password = await AuthUseCase.encryptPassword(body.password);
      const results = await AdminService.createAdmin(body);
      return res
        .status(201)
        .json({ message: "Sucesso ao criar Admin!", results });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }
}
