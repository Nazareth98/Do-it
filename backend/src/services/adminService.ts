import AdminRepository from "../repositories/adminRepository";
import { AdminType } from "../types/adminTypes";

export default class AdminService {
  static async createAdmin(body: AdminType) {
    try {
      const result = await AdminRepository.create(body);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async checkUsernameExists(body: AdminType) {
    const { username } = body;
    try {
      const admin = await AdminRepository.getByUsername(username);
      if (admin) throw new Error("Esse nome de usuário já está em uso.");
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
