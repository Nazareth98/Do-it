import TicketRepository from "../repositories/ticketRepository";
import { TicketType } from "../types/ticketType";

export default class TicketService {
  static async updateStatus(ticketId: number, status: string) {
    try {
      const data = { ticketId, status };
      const result = await TicketRepository.updateStatus(data);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getById(id: number) {
    try {
      const ticket = await TicketRepository.getById(id);
      const notes = await TicketRepository.getNotesByTicketId(id);
      ticket.notes = notes;
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async addNote(body: any, user: any, ticketId: number) {
    if (!body.content || typeof body.content !== "string") {
      throw new Error("O conteúdo da nota precisa ser uma texto válido.");
    }

    try {
      let result;

      const data = {
        content: body.content,
        userId: user.id,
        ticketId,
      };

      if (user.type === "admin") {
        result = await TicketRepository.createAdminNote(data);
      }

      if (user.type === "member") {
        result = await TicketRepository.createMemberNote(data);
      }

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll() {
    try {
      const result = await TicketRepository.getAll();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async create(body: TicketType) {
    try {
      const result = await TicketRepository.create(body);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
