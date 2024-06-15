import mysql, { Pool, PoolConnection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

interface DBConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

class DashboardDatabase {
  private pool: Pool;
  private connection: PoolConnection | null;

  constructor(config: DBConfig) {
    this.pool = mysql.createPool(config);
    this.connection = null;
  }

  static getInstance(config: DBConfig) {
    if (!this.instance) {
      this.instance = new DashboardDatabase(config);
    }

    return this.instance;
  }

  async connect() {
    try {
      this.connection = await this.pool.getConnection();
      console.log("Conexão bem-sucedida!");
    } catch (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
    }
  }

  async execute(sql: string, values: any[]) {
    try {
      if (!this.connection) {
        throw new Error("Não há conexão ativa com o banco de dados.");
      }
      const [results] = await this.connection.execute(sql, values);
      return results;
    } catch (err) {
      console.error("Erro ao executar a consulta:", err);
      throw err;
    }
  }

  async end() {
    try {
      if (this.connection) {
        await this.connection.release();
        console.log("Conexão encerrada.");
      } else {
        throw new Error("Não há conexão ativa para encerrar.");
      }
    } catch (err) {
      console.error("Erro ao encerrar a conexão:", err);
    }
  }
}

const dbConfig: DBConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_SCHEMA || "",
};

const db = DashboardDatabase.getInstance(dbConfig);

export default db;
