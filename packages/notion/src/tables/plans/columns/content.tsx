import type { ColumnDef } from "@tanstack/react-table";

import { Plan } from "@swy/validators";

import { ContentCell, type ContentCellProps } from "../cells";

export interface ContentPlanRow
  extends Omit<Record<Plan, ContentCellProps>, Plan.EDUCATION> {
  title: string;
}

export const contentColumns: ColumnDef<ContentPlanRow>[] = [
  {
    accessorKey: "title",
    header: () => null,
    cell: ({ row }) => (
      <div className="min-w-0 max-w-[118px] p-3">{row.getValue("title")}</div>
    ),
  },
  ...Object.values(Plan)
    .filter((plan) => plan !== Plan.EDUCATION)
    .map<ColumnDef<ContentPlanRow>>((plan) => ({
      accessorKey: plan,
      header: () => null,
      cell: ({ row }) => <ContentCell {...row.getValue(plan)} />,
    })),
];