import { BaseEntity, EntityStatus } from "./entity.types";

type SystemFields = "id" | "createdAt" | "updatedAt";

export type CreateDto<T extends BaseEntity> = Omit<T, SystemFields>;

export type UpdateDto<T extends BaseEntity> = Partial<CreateDto<T>>;

export type EntitySummary<T extends BaseEntity & { title: string; price: number }> = Pick<
  T,
  "id" | "title" | "price"
>;

export type EntityAnalytics<T extends { status: EntityStatus } = { status: EntityStatus }> = Record<
  T["status"],
  number
>;
