import { Request, Response } from "express";
import path from "path";
import fs from "fs";

import TicketUseCase from "../useCases/ticketUseCase";
import TicketService from "../services/ticketService";
import TicketRepository from "../repositories/ticketRepository";
import AuthService from "../services/authService";

export default class TicketControlller {
  static async getFile(req: Request, res: Response) {
    try {
      const filename = req.params.filename;
      const directoryPath = path.join(__dirname, "../../uploads");
      const filePath = path.join(directoryPath, filename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
      }

      res.download(filePath, (err) => {
        if (err) {
          return res.status(500).send("Could not download the file");
        }
      });
    } catch (error) {
      console.error("Error serving the file:", error);
      return res.status(500).send("Internal server error");
    }
  }

  static async create(req: Request, res: Response) {
    const body = Object.assign({}, req.body);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = await AuthService.decodeToken(token);
    const files = req.files as Express.Multer.File[];
    body.customerId = Number(body.customerId);
    try {
      TicketUseCase.validateFields(body);
      const result = await TicketService.create(body);
      const ticketId = result.insertId;
      // Inserir anexos
      for (const file of files) {
        await TicketRepository.createAttatchment(file, ticketId);
      }
      const memberId = user.id;
      const updatedResults = await TicketRepository.getAllMyMember(memberId);
      return res
        .status(201)
        .json({ message: "Sucesso ao criar Ticket!", result: updatedResults });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = await AuthService.decodeToken(token);
    try {
      let result;

      if (user.type === "member") {
        const memberId = user.id;
        result = await TicketRepository.getAllMyMember(memberId);
      } else {
        const adminId = user.id;
        result = await TicketRepository.getAllByAdmin(adminId);
      }

      return res.status(201).json({
        message: "Sucesso ao consultar Tickets!",
        result,
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const result = await TicketService.getById(id);
      return res.status(201).json({
        message: "Sucesso ao consultar Ticket!",
        result,
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }

  static async addNote(req: Request, res: Response) {
    const body = Object.assign({}, req.body);
    const files = req.files as Express.Multer.File[];
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const ticketId = Number(req.params.id);
    try {
      const user = await AuthService.decodeToken(token);
      const results = await TicketService.addNote(body, user, ticketId);
      const noteId = results.insertId;
      // Inserir anexos
      for (const file of files) {
        await TicketRepository.createAttatchmentNote(file, ticketId, noteId);
      }
      const ticket = await TicketService.getById(ticketId);
      return res.status(201).json({
        message: "Sucesso ao adicionar Nota ao Ticket!",
        result: ticket,
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    const { status } = req.body;
    const ticketId = Number(req.params.id);

    try {
      const results = await TicketService.updateStatus(ticketId, status);
      const ticket = await TicketService.getById(ticketId);
      return res.status(201).json({
        message: `Sucesso ao atualizar status para ${status}!`,
        result: ticket,
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }

  static async deleteById() {}
}
