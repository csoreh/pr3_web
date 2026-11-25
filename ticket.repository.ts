import { randomUUID } from "node:crypto";
import { CreateDto, EntityAnalytics, EntityStatus, Ticket, TicketEntity, UpdateDto } from "../types";
import { InMemoryRepository } from "./in-memory.repository";
import { LogExecutionTime } from "../decorators";

export class TicketRepository extends InMemoryRepository<TicketEntity> {
  @LogExecutionTime()
  override create(item: TicketEntity): TicketEntity {
    return super.create(item);
  }

  @LogExecutionTime()
  override update(id: string, patch: UpdateDto<TicketEntity>): TicketEntity | null {
    return super.update(id, patch);
  }

  @LogExecutionTime()
  override findAll(): TicketEntity[] {
    return super.findAll();
  }

  createFromDto(dto: CreateDto<TicketEntity>): TicketEntity {
    const stamp = new Date();
    const ticket = new Ticket({
      ...dto,
      id: randomUUID().slice(0, 8),
      createdAt: stamp,
      updatedAt: stamp
    });
    return this.create(ticket);
  }

  findByVenue(venue: string): TicketEntity[] {
    const needle = venue.toLowerCase();
    return [...this.items.values()].filter((item) => item.venue.toLowerCase().includes(needle));
  }

  countByStatus(): EntityAnalytics<TicketEntity> {
    const counters: EntityAnalytics<TicketEntity> = {
      [EntityStatus.Active]: 0,
      [EntityStatus.Archived]: 0,
      [EntityStatus.Draft]: 0
    };

    for (const item of this.items.values()) {
      counters[item.status] += 1;
    }

    return counters;
  }
}
