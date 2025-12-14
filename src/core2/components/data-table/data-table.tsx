import { Flex, Pagination, Select, Table } from "@mantine/core";
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import { getCommonPinningStyles } from "./get-common-pinning-styles";
import { Empty } from "../empty";
import { appConfig } from "../../config";

export interface DataTableProps<TData> {
  table: TanstackTable<TData>;
}

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return (
    <>
      <Table.ScrollContainer minWidth={500} pb={0}>
        <Table bg="white" highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...getCommonPinningStyles({ column: header.column }),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Table.Th>
                  );
                })}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td
                      key={cell.id}
                      style={{
                        ...getCommonPinningStyles({ column: cell.column }),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={table.getAllColumns().length} h={240}>
                  <Empty />
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Flex justify="space-between">
        <Flex align="center" gap={12}>
          <Select
            size="xs"
            allowDeselect={false}
            w={80}
            value={`${table.getState().pagination.pageSize}`}
            placeholder="Sahifa hajmi"
            data={appConfig.list.defaultPageSizes.map((s) => s.toString())}
            onChange={(value) => table.setPageSize(Number(value))}
          />
        </Flex>
        <Pagination
          size="sm"
          value={table.getState().pagination.pageIndex + 1}
          total={table.getPageCount()}
          onChange={(value) => table.setPageIndex(value - 1)}
        />
      </Flex>
    </>
  );
}
