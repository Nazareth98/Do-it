export type TicketType = {
  id?: number;
  description: string;
  customerId: number;
  status?: string;
  createdAt?: Date;
};

export type NoteDataType = {
  id: number;
  ticketId: number;
  createdAt: Date | string;
  content: string;
  authorId?: number;
  authorName?: string;
  userType: string;
};
