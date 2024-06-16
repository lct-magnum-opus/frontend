import { TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';

export function TechnoparkTableHeader() {
  return (
    <TableHeader className="text-xs">
      <TableRow>
        <TableHead className="w-[40px] pr-0">
          <span className="sr-only">Действия</span>
        </TableHead>
        <TableHead className="min-w-[200px]">Наименование объекта</TableHead>
        <TableHead className="min-w-[200px]">Ссылка на сайт</TableHead>
        <TableHead className="min-w-[200px]">Категория объекта</TableHead>
        <TableHead className="min-w-[100px]">Налог на имущество</TableHead>
        <TableHead className="min-w-[100px]">Земельный налог</TableHead>
        <TableHead className="min-w-[100px]">Налог на прибыль</TableHead>
        <TableHead className="min-w-[100px]">Страховые взносы</TableHead>
        <TableHead className="min-w-[200px]">Минимальная стоимость аренды, руб./кв.м/год</TableHead>
      </TableRow>
    </TableHeader>
  );
}
