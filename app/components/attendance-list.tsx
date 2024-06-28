import { Form } from '@remix-run/react'
import { getTableHeaders, months } from '@/utils/misx'
import { columns } from './columns'
import { DataTable } from './data-table'
import { PaginationButtons } from './pagination-buttons'

type AttendanceListProps = {
	data: any
	month: string
	year: string
	page: string
	count: number
	pageSize: number
}

export const AttendanceList = ({
	data,
	month,
	year,
	page,
	count,
	pageSize,
}: AttendanceListProps) => {
	const employeeData = data?.employee.map((employee: any) => ({
		...employee,
		month: months.find(m => m.value === month)?.label,
		year,
		present_days: employee?._count?.attendance,
		_count: null,
	}))

	const datasHeader = employeeData
		? getTableHeaders(employeeData[employeeData.length - 1], ['id'])
		: []

	return (
		<div>
			<DataTable
				setRows={() => {}}
				columns={columns({
					headers: datasHeader,
					name: 'employees',
					singleRoute: 'employee',
					length: 40,
					extraRoute: 'attendance',
					page: parseInt(page),
					pageSize: pageSize,
					updateLink: `update?month=${month}&year=${year}`,
					noSelect: true,
				})}
				data={employeeData as any}
			/>
			<Form method="POST">
				<PaginationButtons page={page} count={count} pageSize={pageSize} />
			</Form>
		</div>
	)
}
