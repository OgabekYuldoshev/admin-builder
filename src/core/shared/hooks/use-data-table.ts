import {
	getCoreRowModel,
	getPaginationRowModel,
	type PaginationState,
	type TableOptions,
	type Updater,
	useReactTable,
} from "@tanstack/react-table";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	PAGE_KEY,
	PAGE_SIZE_KEY,
} from "../../constants";

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
		[PAGE_KEY]: parseAsInteger
			.withDefault(DEFAULT_PAGE)
			.withOptions(defaultQueryOption),
		[PAGE_SIZE_KEY]: parseAsInteger
			.withDefault(DEFAULT_PAGE_SIZE)
			.withOptions(defaultQueryOption),
	});

	const page = queries[PAGE_KEY];
	const limit = queries[PAGE_SIZE_KEY];

	const pagination: PaginationState = {
		pageIndex: page - 1,
		pageSize: limit,
	};

	function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
		if (typeof updaterOrValue === "function") {
			const newPagination = updaterOrValue(pagination);
			void setQueries({
				[PAGE_KEY]: newPagination.pageIndex + 1,
				[PAGE_SIZE_KEY]: newPagination.pageSize,
			});
		} else {
			void setQueries({
				[PAGE_KEY]: updaterOrValue.pageIndex + 1,
				[PAGE_SIZE_KEY]: updaterOrValue.pageSize,
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
