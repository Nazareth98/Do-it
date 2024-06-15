import { CustomerType } from "../types/customerType";

export default class CustomerUseCase {
  static validateFields(body: CustomerType) {
    const { name } = body;

    if (!name || typeof name !== "string") {
      throw new Error("O campo 'Nome' é obrigatório e precisa ser um texto.");
    }

    return true;
  }

  static formatData(data: any) {
    const formattedData: CustomerType = {
      id: data.ID,
      name: data.NAME,
      memberId: data.MEMBER_ID,
    };
    return formattedData;
  }
}
