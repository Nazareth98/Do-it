import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import MemberUseCase from "../useCases/memberUseCase";
import MemberService from "../services/memberService";
import AuthUseCase from "../useCases/authUseCase";
import { MemberType } from "../types/memberTypes";
import MemberRepository from "../repositories/memberRepository";
import AuthService from "../services/authService";

export default class MemberControlller {
  static async deleteById(req: Request, res: Response) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const id = Number(req.params.id);
    try {
      const admin = await AuthService.decodeToken(token);
      if (admin.type === "member") {
        return res.status(400).json({
          status: 400,
          message: "Voce precisa ser um admin para deletar um membro!",
        });
      }

      await MemberService.deleteById(id);

      const updatedResults = await MemberRepository.getAll();
      return res.status(200).json({
        message: "Sucesso ao deletar Membro!",
        result: updatedResults,
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
      const admin = await AuthService.decodeToken(token);
      if (admin.type === "member") {
        return res.status(400).json({
          status: 400,
          message: "Voce precisa ser um admin para consultar os membros!",
        });
      }

      const result = await MemberService.getMemberByAdmin(admin);

      return res
        .status(201)
        .json({ message: "Sucesso ao criar member!", result });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    const body = req.body;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
      const admin = await AuthService.decodeToken(token);
      if (admin.type === "member") {
        return res.status(400).json({
          status: 400,
          message: "Você precisa ser um Admin para criar um member.",
        });
      }

      body.adminId = admin.id;
      MemberUseCase.validateFields(body);
      await MemberService.checkUsernameExists(body);
      body.password = await AuthUseCase.encryptPassword(body.password);
      await MemberService.createMember(body);
      const updatedResults = await MemberRepository.getMemberByAdmin(admin.id);
      return res
        .status(201)
        .json({ message: "Sucesso ao criar Membro!", result: updatedResults });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const body: MemberType = req.body;
    try {
      AuthUseCase.validateFieldsLogin(body);
      const member = await MemberRepository.getByUsername(body.username);
      if (!member) {
        return res.status(400).json({
          status: 400,
          message: "Não localizamos esse Nome de Usuário.",
        });
      }
      await MemberUseCase.checkPasswordMatch(member, body.password);
      const secret: string = process.env.SECRET || "dev";
      const token = jwt.sign(
        {
          id: member.id,
          name: member.name,
          username: member.username,
          type: "member",
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
}
