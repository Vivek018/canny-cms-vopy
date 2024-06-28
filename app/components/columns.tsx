import { Form, Link } from '@remix-run/react'
import {
	DetailsMenu,
	DetailsMenuLabel,
	DetailsMenuSeparator,
	DetailsMenuTrigger,
	DetailsPopup,
} from '@/components/details-menu'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { PAGE_SIZE } from '@/constant'
import {
	cn,
	formatStringIntoHtml,
	isTitle,
	replaceUnderscore,
	textTruncate,
} from '../utils/misx'
import { Checkbox } from './ui/checkbox'

export const columns = ({
	headers,
	name,
	singleRoute,
	length = 12,
	extraRoute = '',
	page = 1,
	pageSize = PAGE_SIZE,
	updateLink,
	noSelect = false,
}: {
	headers: {
		accessorKey: string
		header: string
	}[]
	name: string
	singleRoute: string
	length?: number
	extraRoute?: string
	page?: number
	pageSize?: number
	updateLink?: string
	noSelect?: boolean
}): any[] => [
	{
		id: 'select',
		header: ({ table }: any) => (
			<Checkbox
				className={cn(
					'mx-2 hidden',
					!noSelect && headers.length && 'flex',
				)}
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }: any) => (
			<Checkbox
				className={cn(
					'mx-2 hidden',
					!noSelect && headers.length && 'flex',
				)}
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
	},
	headers.length
		? {
				header: 'Sr. No',
				cell: ({ row }: any) => {
					return <p>{page * pageSize - (pageSize - (row.index + 1))}</p>
				},
			}
		: { id: '1' },
	...headers.map(({ accessorKey, header }) => ({
		id: accessorKey,
		accessorKey: accessorKey,
		header: replaceUnderscore(header),
		cell: ({ row }: { row: any }) => {
			const value = row.renderValue(accessorKey)

			if (typeof value === 'string' && isTitle(accessorKey)) {
				const link = `/${name}/${row.original.id}${extraRoute ? `/${extraRoute}` : ''}`
				return (
					<Link
						to={link}
						className={cn(
							'h-min pl-0 capitalize underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none',
						)}
					>
						{textTruncate(value, length ?? 12)}
					</Link>
				)
			} else return formatStringIntoHtml(value, length)
		},
	})),
	{
		id: 'actions',
		cell: ({ row }: { row: any }) => {
			const singleData = row.original
			return (
				<DetailsMenu className="static">
					<DetailsMenuTrigger className="my-1.5 h-full w-min border-none bg-transparent">
						<span className="sr-only">Open menu</span>
						<Icon name="dots-vertical" size="xs" />
					</DetailsMenuTrigger>
					<DetailsPopup className="right-0 gap-px">
						<DetailsMenuLabel className="px-2 py-0.5">Actions</DetailsMenuLabel>
						<DetailsMenuSeparator />
						<Link
							className={cn(
								buttonVariants({
									variant: 'ghost',
									className: cn('h-min justify-start py-1.5 capitalize'),
								}),
							)}
							to={`/${name}/${row.original.id}${extraRoute ? `/${extraRoute}` : ''}`}
						>
							<div>
								View {replaceUnderscore(singleRoute)}{' '}
								{extraRoute ? ' - ' + extraRoute : null}
							</div>
						</Link>
						<Link
							className={cn(
								buttonVariants({
									variant: 'ghost',
									className: cn('h-min justify-start py-1.5 capitalize'),
								}),
							)}
							to={
								updateLink
									? updateLink +
										`${extraRoute === 'attendance' ? `&employee=${row.original.id}` : ''}`
									: `/${name}/${row.original.id}${extraRoute ? `/${extraRoute}` : ''}/update`
							}
						>
							<div>
								Update {replaceUnderscore(singleRoute)}{' '}
								{extraRoute ? ' - ' + extraRoute : null}
							</div>
						</Link>
						<Form>
							<Button
								variant="ghost"
								className="h-min justify-start py-1.5 capitalize"
								onClick={() => {
									return navigator.clipboard.writeText(singleData.id)
								}}
							>
								Copy {replaceUnderscore(singleRoute)} ID
							</Button>
						</Form>
					</DetailsPopup>
				</DetailsMenu>
			)
		},
	},
]
