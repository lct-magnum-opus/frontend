import { TableCell, TableRow } from '@/components/ui/table.tsx';
import { ChatTechnoparkDataItem } from '@/store/chat/types.ts';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

export interface TechnoparkTableRowProps extends ChatTechnoparkDataItem {
  requestedReportName: string | null;
  requestReport: (name: string) => void;
}

export function TechnoparkTableRow({
  link,
  name,
  type,
  tax_estate,
  tax_ground,
  tax_income,
  insurance_premiums,
  minimal_cost_of_buy,
  requestedReportName,
  requestReport
}: TechnoparkTableRowProps) {
  return (
    <TableRow className="text-xs">
      <TableCell className="w-[40px] pr-0">
        <Button
          size="icon"
          variant="ghost"
          disabled={!!requestedReportName}
          onClick={() => requestReport(name)}>
          {requestedReportName === name ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span className="sr-only">Скачать отчет</span>
        </Button>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <a href={link} target={'_blank'}>
          {link}
        </a>
      </TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{`${Math.floor((Number(tax_estate) || 0) * 100)}%`}</TableCell>
      <TableCell>{`${Math.floor((Number(tax_ground) || 0) * 100)}%`}</TableCell>
      <TableCell>{`${Math.floor((Number(tax_income) || 0) * 100)}%`}</TableCell>
      <TableCell>{`${Math.floor((Number(insurance_premiums) || 0) * 100)}%`}</TableCell>
      <TableCell>
        {Number(minimal_cost_of_buy)
          ? `${Math.floor(Number(minimal_cost_of_buy))} руб./кв. м.`
          : '–'}
      </TableCell>
    </TableRow>
  );
}
