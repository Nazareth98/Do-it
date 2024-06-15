import db from "../configs/mysql";
import { AdminType } from "../types/adminTypes";
import AdminUseCase from "../useCases/adminUseCase";

export default class AdminRepository {
  static async create(data: AdminType) {
    const { name, password, username } = data;
    try {
      await db.connect();
      const sql =
        "INSERT INTO tb_admin (NAME, PASSWORD, USERNAME) VALUES (?, ?, ?)";
      const values = [name, password, username];
      const results = await db.execute(sql, values);
      return results;
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
      const sql = "SELECT * FROM tb_admin WHERE USERNAME = ?";
      const values = [username];
      const results = await db.execute(sql, values);
      const formatedResult =
        results.length > 0 ? AdminUseCase.formatData(results[0]) : results[0];
      return formatedResult;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }
}
