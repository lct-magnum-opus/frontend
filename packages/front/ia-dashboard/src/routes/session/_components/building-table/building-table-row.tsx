import { TableCell, TableRow } from '@/components/ui/table.tsx';
import { ChatBuildingDataItem } from '@/store/chat/types.ts';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

export interface TechnoparkTableRowProps extends ChatBuildingDataItem {
  requestedReportName: string | null;
  requestReport: (name: string) => void;
}

export function BuildingTableRow({
  name,
  cost_object,
  site_format,
  ownership_form,
  pref_treatment,
  municipal_entity,
  transaction_form,
  support_infra_object,
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
      <TableCell>{pref_treatment}</TableCell>
      <TableCell>{support_infra_object}</TableCell>
      <TableCell>{municipal_entity}</TableCell>
      <TableCell>{(site_format || []).join(', ')}</TableCell>
      <TableCell>{ownership_form}</TableCell>
      <TableCell>{(transaction_form || []).join(', ')}</TableCell>
      <TableCell>
        {Number(cost_object)
          ? `${Math.floor(Number(cost_object))} руб.`
          : '–'}
      </TableCell>
    </TableRow>
  );
}
