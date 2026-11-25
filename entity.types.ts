export enum EntityStatus {
  Active = "ACTIVE",
  Archived = "ARCHIVED",
  Draft = "DRAFT"
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SeatPosition = [sector: number, row: number, seat: number];

export interface TicketEntity extends BaseEntity {
  title: string;
  price: number;
  venue: string;
  seat: SeatPosition;
  status: EntityStatus;
}
