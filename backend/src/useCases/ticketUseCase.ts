import {
  NoteDataType,
  TicketDetailsType,
  TicketType,
} from "../types/ticketType";

export default class TicketUseCase {
  static formatDetailsData(data: any[]) {
    // Use a estrutura de dados Map para agrupar tickets por ID
    const ticketMap = new Map<number, TicketDetailsType>();

    data.forEach((item) => {
      const ticketId = item.ID;

      if (!ticketMap.has(ticketId)) {
        // Se o ticket ainda não estiver no Map, adiciona-o
        ticketMap.set(ticketId, {
          id: item.ID,
          description: item.DESCRIPTION,
          status: item.STATUS,
          createdAt: new Date(item.CREATED_AT),
          customerId: item.CUSTOMER_ID,
          customerName: item.CUSTOMER_NAME,
          memberId: item.MEMBER_ID,
          memberName: item.MEMBER_NAME,
          attachments: [],
        });
      }

      // Adiciona o attachment ao ticket existente no Map
      if (item.ATTACHMENT_ID) {
        const ticket = ticketMap.get(ticketId);
        ticket.attachments.push({
          id: item.ATTACHMENT_ID,
          path: item.ATTACHMENT_PATH,
        });
      }
    });

    // Converte o Map para um array de resultados formatados
    const formattedResult = Array.from(ticketMap.values());
    return formattedResult;
  }

  static formatData(data: any) {
    const formattedResult: TicketType = {
      id: data.ID,
      customerId: data.CUSTOMER_ID,
      description: data.DESCRIPTION,
      createdAt: data.CREATED_AT,
      status: data.STATUS,
    };
    return formattedResult;
  }

  static formatNoteData(data: any[]) {
    // Use a estrutura de dados Map para agrupar notas por ID
    const noteMap = new Map<number, NoteDataType>();

    data.forEach((item) => {
      const noteId = item.ID;

      if (!noteMap.has(noteId)) {
        // Se a nota ainda não estiver no Map, adiciona-a
        const note: NoteDataType = {
          id: item.ID,
          content: item.CONTENT,
          createdAt: new Date(item.CREATED_AT),
          ticketId: item.TICKET_ID,
          userType: item.USER_TYPE,
          attachments: [],
        };

        if (item.USER_TYPE === "member") {
          note.authorId = item.MEMBER_ID;
          note.authorName = item.MEMBER_NAME;
        }

        if (item.USER_TYPE === "admin") {
          note.authorId = item.ADMIN_ID;
          note.authorName = item.ADMIN_NAME;
        }

        noteMap.set(noteId, note);
      }

      // Adiciona o attachment à nota existente no Map
      if (item.ATTACHMENT_ID) {
        const note = noteMap.get(noteId);
        note.attachments.push({
          id: item.ATTACHMENT_ID,
          path: item.ATTACHMENT_PATH,
        });
      }
    });

    // Converte o Map para um array de resultados formatados
    const formattedResult = Array.from(noteMap.values());
    return formattedResult;
  }

  static validateFields(body: TicketType) {
    const { description, customerId } = body;

    if (!description || typeof description !== "string") {
      throw new Error(
        "O campo 'Descrição' é obrigatório e precisa ser um texto."
      );
    }

    if (!customerId || typeof customerId !== "number") {
      throw new Error("O campo 'Cliente' é obrigatório.");
    }

    return true;
  }
}
