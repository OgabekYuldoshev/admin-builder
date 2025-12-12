import {
	getCoreRowModel,
	getPaginationRowModel,
	type PaginationState,
	type TableOptions,
	type Updater,
	useReactTable,
} from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs";
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	PAGE_KEY,
	PAGE_SIZE_KEY,
} from "../../constants";

export interface DataTableProps<TData>
	extends Omit<TableOptions<TData>, "state" | "getCoreRowModel"> {}
export const useDataTable = <TData>({
	initialState,
	...props
}: DataTableProps<TData>) => {
	const [page, setPage] = useQueryState(
		PAGE_KEY,
		parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({
			shallow: false,
			clearOnDefault: true,
		}),
	);

	const [perPage, setPerPage] = useQueryState(
		PAGE_SIZE_KEY,
		parseAsInteger
			.withDefault(initialState?.pagination?.pageSize ?? DEFAULT_PAGE_SIZE)
			.withOptions({
				shallow: false,
				clearOnDefault: true,
			}),
	);

	const pagination: PaginationState = {
		pageIndex: page - 1,
		pageSize: perPage,
	};

	function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
		if (typeof updaterOrValue === "function") {
			const newPagination = updaterOrValue(pagination);
			void setPage(newPagination.pageIndex + 1);
			void setPerPage(newPagination.pageSize);
		} else {
			void setPage(updaterOrValue.pageIndex + 1);
			void setPerPage(updaterOrValue.pageSize);
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
