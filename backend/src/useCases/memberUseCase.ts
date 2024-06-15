import bcrypt from "bcrypt";

import { MemberType } from "../types/memberTypes";

export default class MemberUseCase {
  static validateFields(body: MemberType) {
    const { name, password, confirmPassword, username } = body;

    if (!name || typeof name !== "string") {
      throw new Error("O campo 'Nome' é obrigatório e precisa ser um texto.");
    }

    if (!password || typeof password !== "string") {
      throw new Error("O campo 'Senha' é obrigatório e precisa ser um texto.");
    }

    if (!confirmPassword || typeof confirmPassword !== "string") {
      throw new Error(
        "O campo 'Confirmar Senha' é obrigatório e precisa ser um texto."
      );
    }

    if (password !== confirmPassword) {
      throw new Error("Senhas não conferem.");
    }

    if (!username || typeof username !== "string") {
      throw new Error(
        "O campo 'Nome de Usuário' é obrigatório e precisa ser um texto."
      );
    }

    return true;
  }

  static formatData(data: any) {
    const formattedData: MemberType = {
      id: data.ID,
      name: data.NAME,
      password: data.PASSWORD,
      username: data.USERNAME,
      adminId: data.ADMIN_ID,
    };
    return formattedData;
  }

  static async checkPasswordMatch(admin: MemberType, password: string) {
    const checkPassword = await bcrypt.compare(password, admin.password);

    if (!checkPassword) throw new Error("Senha incorreta!");

    return true;
  }
}
