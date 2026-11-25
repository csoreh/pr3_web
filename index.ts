import {
  ApiResponse,
  CreateDto,
  EntityStatus,
  EntitySummary,
  Ticket,
  TicketEntity,
  UpdateDto
} from "./types";
import { TicketRepository } from "./repositories";

function wrapResponse<T>(data: T, meta?: Record<string, unknown>): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: true,
    timestamp: new Date(),
    data
  };
  if (meta) {
    response.meta = meta;
  }
  return response;
}

const repository = new TicketRepository();

console.log("=== ІНІЦІАЛІЗАЦІЯ GENERIC SERVICE LAYER ===\n");

const drafts: CreateDto<TicketEntity>[] = [
  {
    title: "Рок-фестиваль: денний пропуск",
    price: 1450,
    venue: "Стадіон Металіст",
    seat: [4, 12, 8],
    status: EntityStatus.Active
  },
  {
    title: "Опера «Наталка Полтавка»",
    price: 700,
    venue: "Оперний театр",
    seat: [1, 5, 21],
    status: EntityStatus.Draft
  },
  {
    title: "Фінал кубка з баскетболу",
    price: 520,
    venue: "Палац спорту",
    seat: [7, 3, 2],
    status: EntityStatus.Archived
  }
];

const created = drafts.map((dto) => {
  const ticket = repository.createFromDto(dto);
  console.log(
    `- Створено сутність ID: ${ticket.id} | Статус: ${ticket.status} | Назва: ${ticket.title}\n`
  );
  return ticket;
});

const opera = created[1];
if (!opera) {
  throw new Error("Не вдалося створити тестові квитки");
}

const patch: UpdateDto<TicketEntity> = {
  price: 780,
  status: EntityStatus.Active
};

const updated = repository.update(opera.id, patch);
if (updated) {
  console.log(`- Оновлено сутність ID: ${updated.id} | Актуалізовано ціну, статус та updatedAt.\n`);
}

const all = repository.findAll();
console.log(`Отримано сутностей у репозиторії: ${all.length}`);

const sample = created[0];
if (sample instanceof Ticket) {
  console.log(`Місце першого квитка: ${sample.describeSeat()}`);
  console.log(`Прототип заморожено: ${Object.isFrozen(Ticket.prototype)}`);
}

console.log(`Квитки в театрі: ${repository.findByVenue("театр").map((t) => t.title).join(", ")}`);

const summaries: EntitySummary<TicketEntity>[] = all.map(({ id, title, price }) => ({ id, title, price }));
console.log("\n=== ПРЕВ'Ю КАТАЛОГУ (PICK) ===");
console.table(summaries);

console.log("\n=== СТАТИСТИКА СТАТУСІВ (RECORD) ===");
console.log(JSON.stringify(repository.countByStatus(), null, 2));

console.log("\n=== СТАНДАРТИЗОВАНА ВІДПОВІДЬ API (GENERIC API RESPONSE) ===");
const response = wrapResponse(updated, { totalCount: all.length, version: "1.0.0" });
console.log(JSON.stringify(response, null, 2));

console.log(`\nВидалення квитка ${created[2]?.id}: ${repository.deleteById(created[2]?.id ?? "")}`);
console.log(`Пошук видаленого: ${repository.findById(created[2]?.id ?? "")}`);
