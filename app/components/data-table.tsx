import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useEffect } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

type DataTableProps<TData> = {
	columns: any[]
	data: TData[]
	rowSelection?: any
	setRowSelection?: React.Dispatch<React.SetStateAction<any>>
	setRows: React.Dispatch<React.SetStateAction<any>>
}

export function DataTable<TData>({
	columns,
	data,
	rowSelection,
	setRowSelection,
	setRows,
}: DataTableProps<TData>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection ?? undefined,
		state: rowSelection
			? {
					rowSelection,
				}
			: {},
	})

	useEffect(() => {
		if (table.getSelectedRowModel().rows.length) {
			table
				.getSelectedRowModel()
				.rows.map((selectedRow: any) =>
					setRows((prevValue: any) => [...prevValue, selectedRow.original?.id]),
				)
		} else {
			setRows([])
		}
	}, [rowSelection, setRows, table])

	return (
		<div className="relative rounded-md">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<TableHead key={header.id} className="py-3 capitalize">
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map(cell => {
									return (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									)
								})}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center text-base"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
