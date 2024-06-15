import db from "../configs/mysql";
import { MemberType } from "../types/memberTypes";
import MemberUseCase from "../useCases/memberUseCase";

export default class MemberRepository {
  static async delete(id: number) {
    try {
      await db.connect();
      const sql = "DELETE FROM tb_member where ID = ?";
      const values = [id];
      const results = await db.execute(sql, values);
      return results;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async getMemberByAdmin(adminId: number) {
    try {
      await db.connect();
      const sql = "SELECT * FROM tb_member where ADMIN_ID = ?";
      const values = [adminId];
      const results = await db.execute(sql, values);
      const formatedResult =
        results.length > 0
          ? results.map((item) => MemberUseCase.formatData(item))
          : results;
      return formatedResult;
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
      const sql = "SELECT * FROM tb_member";
      const results = await db.execute(sql);
      const formatedResult =
        results.length > 0
          ? results.map((item) => MemberUseCase.formatData(item))
          : results;
      return formatedResult;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async getByUsername(username: string) {
    try {
      await db.connect();
      const sql = "SELECT * FROM tb_member WHERE USERNAME = ?";
      const values = [username];
      const results = await db.execute(sql, values);
      const formatedResult =
        results.length > 0 ? MemberUseCase.formatData(results[0]) : results[0];
      return formatedResult;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async create(data: MemberType) {
    const { name, password, username, adminId } = data;
    try {
      await db.connect();
      const sql =
        "INSERT INTO tb_member (NAME, PASSWORD, USERNAME, ADMIN_ID) VALUES (?, ?, ?, ?)";
      const values = [name, password, username, adminId];
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
