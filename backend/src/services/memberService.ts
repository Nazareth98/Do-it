import MemberRepository from "../repositories/memberRepository";
import { MemberType } from "../types/memberTypes";

export default class MemberService {
  static async deleteById(id: number) {
    try {
      const result = await MemberRepository.delete(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getMemberByAdmin(admin: any) {
    try {
      const adminId = admin.id;
      const result = await MemberRepository.getMemberByAdmin(adminId);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createMember(body: MemberType) {
    try {
      const result = await MemberRepository.create(body);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async checkUsernameExists(body: MemberType) {
    const { username } = body;
    try {
      const member = await MemberRepository.getByUsername(username);
      if (member) throw new Error("Esse nome de usuário já está em uso.");
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
