import db from "../configs/mysql";
import { TicketType } from "../types/ticketType";
import TicketUseCase from "../useCases/ticketUseCase";

export default class TicketRepository {
  static async createAttatchment(file: any, ticketId: number) {
    try {
      await db.connect();
      const sql =
        "INSERT INTO tb_attachment (ticket_id, file_path) VALUES (?, ?)";
      const values = [ticketId, file.path];
      const results = await db.execute(sql, values);
      return results;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async createAttatchmentNote(
    file: any,
    ticketId: number,
    noteId: number
  ) {
    try {
      await db.connect();
      const sql =
        "INSERT INTO tb_attachment (ticket_id, note_id, file_path) VALUES (?, ?, ?)";
      const values = [ticketId, noteId, file.path];
      const results = await db.execute(sql, values);
      return results;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async getAllByAdmin(adminId: number) {
    try {
      await db.connect();
      const sql = "SELECT * FROM vw_ticket_details WHERE ADMIN_ID = ?";
      const values = [adminId];
      const results = await db.execute(sql, values);
      const formatedResult =
        results.length > 0 ? TicketUseCase.formatDetailsData(results) : results;
      return formatedResult;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async getAllMyMember(memberId: number) {
    try {
      await db.connect();
      const sql = "SELECT * FROM vw_ticket_details WHERE MEMBER_ID = ?";
      const values = [memberId];
      const results = await db.execute(sql, values);
      const formatedResult =
        results.length > 0 ? TicketUseCase.formatDetailsData(results) : results;
      return formatedResult;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async updateStatus(data: any) {
    const { status, ticketId } = data;
    try {
      await db.connect();
      const sql = "UPDATE tb_ticket SET STATUS = ? where ID = ?";
      const values = [status, ticketId];
      const results = await db.execute(sql, values);
      return results;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async getNotesByTicketId(id: number) {
    try {
      await db.connect();
      const sql = "select * from vw_notes where ticket_id = ?";
      const values = [id];
      const results = await db.execute(sql, values);
      const formatedResult =
        results.length > 0 ? TicketUseCase.formatNoteData(results) : results;
      return formatedResult;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async createAdminNote(data: any) {
    const { ticketId, userId, content } = data;
    const createdAt = new Date();
    createdAt.setHours(createdAt.getHours() - 3);
    try {
      await db.connect();
      const sql =
        "INSERT INTO tb_note (TICKET_ID, ADMIN_ID, CREATED_AT, CONTENT) VALUES (?, ?, ?, ?)";
      const values = [ticketId, userId, createdAt, content];
      const results = await db.execute(sql, values);
      return results;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async createMemberNote(data: any) {
    const { ticketId, userId, content } = data;
    const createdAt = new Date();
    createdAt.setHours(createdAt.getHours() - 3);
    try {
      await db.connect();
      const sql =
        "INSERT INTO tb_note (TICKET_ID, MEMBER_ID, CREATED_AT, CONTENT) VALUES (?, ?, ?, ?)";
      const values = [ticketId, userId, createdAt, content];
      const results = await db.execute(sql, values);
      return results;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async getById(id: number) {
    try {
      await db.connect();
      const sql = "SELECT * FROM vw_ticket_details WHERE ID = ?";
      const values = [id];
      const results = await db.execute(sql, values);
      const formatedResult =
        results.length > 0 ? TicketUseCase.formatDetailsData(results) : results;
      return formatedResult[0];
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async getAll() {
    try {
      await db.connect();
      const sql = "SELECT * FROM vw_ticket_details";
      const results = await db.execute(sql);
      const formatedResult =
        results.length > 0
          ? results.map((item) => TicketUseCase.formatDetailsData(item))
          : results;
      return formatedResult;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async create(data: TicketType) {
    const { description, customerId } = data;
    const createdAt = new Date();
    createdAt.setHours(createdAt.getHours() - 3);
    try {
      await db.connect();
      const sql =
        "INSERT INTO tb_ticket (DESCRIPTION, CUSTOMER_ID, CREATED_AT, STATUS) VALUES (?, ?, ?, 'PENDENTE')";
      const values = [description, customerId, createdAt];
      const results = await db.execute(sql, values);
      return results;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }
}
