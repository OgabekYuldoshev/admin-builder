import {
  getCoreRowModel,
  getPaginationRowModel,
  type PaginationState,
  type TableOptions,
  type Updater,
  useReactTable,
} from "@tanstack/react-table";
import { parseAsInteger, useQueryStates } from "nuqs";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants";

const defaultQueryOption = {
  shallow: false,
  clearOnDefault: true,
};

export interface DataTableProps<TData>
  extends Omit<TableOptions<TData>, "state" | "getCoreRowModel"> {}
export const useDataTable = <TData>({
  initialState,
  ...props
}: DataTableProps<TData>) => {
  const [queries, setQueries] = useQueryStates({
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions(defaultQueryOption),
    limit: parseAsInteger
      .withDefault(DEFAULT_PAGE_SIZE)
      .withOptions(defaultQueryOption),
  });

  const page = queries.page;
  const limit = queries.limit;

  const pagination: PaginationState = {
    pageIndex: page - 1,
    pageSize: limit,
  };

  function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
    if (typeof updaterOrValue === "function") {
      const newPagination = updaterOrValue(pagination);
      void setQueries({
        page: newPagination.pageIndex + 1,
        limit: newPagination.pageSize,
      });
    } else {
      void setQueries({
        page: updaterOrValue.pageIndex + 1,
        limit: updaterOrValue.pageSize,
      });
    }
  }

  const table = useReactTable({
    ...props,
    initialState,
    state: {
      pagination,
    },
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return table;
};
