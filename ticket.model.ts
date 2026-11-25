import { FrozenEntity } from "../decorators";
import { EntityStatus, SeatPosition, TicketEntity } from "./entity.types";

@FrozenEntity()
export class Ticket implements TicketEntity {
  readonly id: string;
  title: string;
  price: number;
  venue: string;
  seat: SeatPosition;
  status: EntityStatus;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor(data: TicketEntity) {
    this.id = data.id;
    this.title = data.title;
    this.price = data.price;
    this.venue = data.venue;
    this.seat = [...data.seat];
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  describeSeat(): string {
    const [sector, row, place] = this.seat;
    return `сектор ${sector}, ряд ${row}, місце ${place}`;
  }
}
