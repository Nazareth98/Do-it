export type TicketType = {
  id?: number;
  description: string;
  customerId: number;
  status?: string;
  createdAt?: Date;
};

export interface NoteDataType {
  id: number;
  content: string;
  createdAt: Date;
  ticketId: number;
  userType: string;
  authorId?: number;
  authorName?: string;
  attachments: { id: number; path: string }[];
}

export interface TicketDetailsType {
  id: number;
  description: string;
  status: string;
  createdAt: Date;
  customerId: number;
  customerName: string;
  memberId: number;
  memberName: string;
  attachments: { id: number; path: string }[];
}
