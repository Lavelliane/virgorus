import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

const columns = [
  {
    key: "numberOfPax",
    label: "No. of pax",
  },
  {
    key: "ratePerPax",
    label: "Rate per pax",
  },
];

interface RatesAndInclusions {
	id?: number;
	numberOfPax?: string;
	ratePerPax?: string;
	packageId?: number;
}

interface RatesTableProps {
    rates?: RatesAndInclusions[];
}

export function RatesTable(data: RatesTableProps) {
  return (
    <Table 
        aria-label="Rates Table" 
        isStriped
        isCompact
        shadow="sm"
        classNames={{
            base: 'text-xl'
        }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data.rates}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "ratePerPax" ? (
                  `₱ ${Number(getKeyValue(item, columnKey)).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
