import CustomerRepository from "../repositories/customerRepository";
import { CustomerType } from "../types/customerType";

export default class CustomerService {
  static async deleteById(id: number) {
    try {
      const result = await CustomerRepository.delete(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async checkNameExists(body: CustomerType, memberId: number) {
    const { name } = body;
    try {
      const customer = await CustomerRepository.getByName(name, memberId);
      if (customer) throw new Error("Já existe um Cliente com esse nome.");
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async create(body: CustomerType, memberId: number) {
    try {
      const result = await CustomerRepository.create(body, memberId);
      return result;
    } catch (error) {
      throw new Errow(error);
    }
  }
}
