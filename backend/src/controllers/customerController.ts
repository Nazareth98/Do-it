import { Request, Response } from "express";
import CustomerUseCase from "../useCases/customerUseCase";
import CustomerService from "../services/customerService";
import CustomerRepository from "../repositories/customerRepository";
import AuthService from "../services/authService";

export default class CustomerController {
  static async deleteById(req: Request, res: Response) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const id = Number(req.params.id);
    try {
      const member = await AuthService.decodeToken(token);
      if (member.type === "admin") {
        return res.status(400).json({
          status: 400,
          message: "Voce precisa ser um admin para excluir um cliente!",
        });
      }

      await CustomerService.deleteById(id);

      const updatedResults = await CustomerRepository.getCustomersByMemberId(
        member.id
      );
      return res.status(200).json({
        message: "Sucesso ao deletar Cliente!",
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
      const user = await AuthService.decodeToken(token);

      if (user.type === "admin") {
        return res.status(400).json({
          status: 400,
          message:
            "Administreadores não podem CONSULTAR clientes por enquanto!",
        });
      }

      const memberId = user.id;
      const customers = await CustomerRepository.getCustomersByMemberId(
        memberId
      );

      return res
        .status(201)
        .json({ message: "Sucesso ao consultar Clientes!", result: customers });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    const body = req.body;
    const memberId = Number(req.params.id);
    try {
      CustomerUseCase.validateFields(body);
      await CustomerService.checkNameExists(body, memberId);
      await CustomerService.create(body, memberId);
      const updatedResult = await CustomerRepository.getCustomersByMemberId(
        memberId
      );
      return res
        .status(201)
        .json({ message: "Sucesso ao criar Cliente!", result: updatedResult });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }
}
