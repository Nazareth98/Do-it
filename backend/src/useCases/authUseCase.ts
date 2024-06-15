import bcrypt from "bcrypt";
import { AdminType } from "../types/adminTypes";

export default class AuthUseCase {
  static validateFieldsLogin(body: AdminType) {
    const { username, password } = body;

    if (!username || typeof username !== "string") {
      throw new Error(
        "O campo 'Nome de usuario' é obrigatório e precisa ser um texto."
      );
    }

    if (!password || typeof password !== "string") {
      throw new Error("O campo 'Senha' é obrigatório e precisa ser um texto.");
    }
  }

  static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash;
  }
}
