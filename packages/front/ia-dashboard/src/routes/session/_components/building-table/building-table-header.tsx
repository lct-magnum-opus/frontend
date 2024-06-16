import { TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';

export function BuildingTableHeader() {
  return (
    <TableHeader className="text-xs">
      <TableRow>
        <TableHead className="w-[40px] pr-0">
          <span className="sr-only">Действия</span>
        </TableHead>
        <TableHead className="min-w-[300px]">Наименование объекта</TableHead>
        <TableHead className="min-w-[200px]">Преференциальный режим</TableHead>
        <TableHead className="min-w-[200px]">Объект инфраструктуры поддержки</TableHead>
        <TableHead className="min-w-[100px]">Муниципальное образование</TableHead>
        <TableHead className="min-w-[100px]">Формат площадки</TableHead>
        <TableHead className="min-w-[100px]">Форма собственности объекта</TableHead>
        <TableHead className="min-w-[100px]">Форма сделки</TableHead>
        <TableHead className="min-w-[200px]">Стоимость объекта, руб. (покупки или месячной аренды)</TableHead>
      </TableRow>
    </TableHeader>
  );
}
