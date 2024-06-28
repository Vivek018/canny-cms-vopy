import { Link, useNavigate } from '@remix-run/react'
import { type ReactNode } from 'react'
import { cn } from '@/utils/misx'
import { Icon } from './ui/icon'

export function Modal({
	link,
	children,
	inMiddle,
	modalClassName,
	className,
	iconClassName,
	shouldNotNavigate = false,
  setOpen,
}: {
	link?: string
	children?: ReactNode
	inMiddle?: boolean
	modalClassName?: string
	className?: string
	iconClassName?: string
	shouldNotNavigate?: boolean
  setOpen?: any
}) {
	const navigate = useNavigate()

	return (
		<div
			className={cn(
				'min-w-screen absolute inset-0 z-30 grid min-h-screen place-items-end',
				inMiddle && 'place-items-center',
        modalClassName
			)}
		>
			<Link
				to={link ?? '..'}
				relative="path"
				className={cn(
					'min-w-screen absolute inset-0 z-40 grid h-full min-h-screen w-full place-items-end bg-transparent/70',
					inMiddle && ' place-items-center',
				)}
				onClick={() => {
          if (setOpen) {
            setOpen((prev: boolean) => !prev)
          }
					if (!shouldNotNavigate) {
						navigate(-1)
					} else {
						navigate(link ?? '..')
					}
				}}
			>
				a
			</Link>
			<div
				className={cn(
					'no-scrollbar z-50 h-full overflow-scroll border-[0.5px] border-muted-foreground/15 bg-background px-12 py-6 drop-shadow-lg dark:bg-muted',
					inMiddle && 'h-min rounded-md',
					className,
				)}
			>
				<Link
					to={link ?? '..'}
					relative="path"
					className={cn(
						'absolute right-2.5 top-2.5 grid place-items-center rounded-full bg-accent p-2 shadow-sm hover:brightness-90',
						!inMiddle && 'sr-only',
						iconClassName,
					)}
					onClick={() => {
            if (setOpen) {
							setOpen((prev: boolean) => !prev)
						}
						if (!shouldNotNavigate) {
							navigate(-1)
						} else {
							navigate(link ?? '..')
						}
					}}
				>
					<Icon name="cross" size="xs" />
				</Link>
				{children}
			</div>
		</div>
	)
}
