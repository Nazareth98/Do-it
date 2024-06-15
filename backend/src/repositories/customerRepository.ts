import db from "../configs/mysql";
import { CustomerType } from "../types/customerType";
import CustomerUseCase from "../useCases/customerUseCase";

export default class CustomerRepository {
  static async delete(id: number) {
    try {
      await db.connect();
      const sql = "DELETE FROM tb_customer where ID = ?";
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

  static async getCustomersByMemberId(memberId: number) {
    try {
      await db.connect();
      const sql = "SELECT * FROM tb_customer WHERE MEMBER_ID = ?";
      const values = [memberId];
      const results = await db.execute(sql, values);
      const formatedResult =
        results.length > 0
          ? results.map((item) => CustomerUseCase.formatData(item))
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
      const sql = "SELECT * FROM tb_customer";
      const results = await db.execute(sql);
      const formatedResult =
        results.length > 0
          ? results.map((item) => CustomerUseCase.formatData(item))
          : results;
      return formatedResult;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async create(data: CustomerType, memberId: number) {
    const { name } = data;
    try {
      await db.connect();
      const sql = "INSERT INTO tb_customer (NAME, MEMBER_ID) VALUES (?, ?)";
      const values = [name, memberId];
      const results = await db.execute(sql, values);
      return results;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }

  static async getByName(name: string, memberId: number) {
    try {
      await db.connect();
      const sql = "SELECT * FROM tb_customer WHERE NAME = ? AND MEMBER_ID = ?";
      const values = [name, memberId];
      const results = await db.execute(sql, values);
      const formatedResult =
        results.length > 0
          ? CustomerUseCase.formatData(results[0])
          : results[0];
      return formatedResult;
    } catch (error) {
      console.error("Erro na operação do banco de dados:", error);
      throw new Error(error);
    } finally {
      await db.end();
    }
  }
}
