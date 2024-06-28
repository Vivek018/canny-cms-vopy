import { Link, useNavigate } from '@remix-run/react'
import { useState } from 'react'
import { navList } from '@/constant'
import { useIsDocument } from '@/utils/clients/is-document'
import { useRefFocus } from '@/utils/clients/ref-focus'
import { cn, textTruncate } from '@/utils/misx'
import { type IconName } from '~/icon-name'
import { DetailsMenu, DetailsMenuTrigger, DetailsPopup } from './details-menu'
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './ui/command'
import { Icon } from './ui/icon'
import { Shortcut } from './ui/shortcut'

export function GotoSelector({ className }: { className?: string }) {
	const [gotofocus, setGotoFocus] = useState(false)
	const { ref: inputRef } = useRefFocus(gotofocus)
	const { isDocument } = useIsDocument()
	const navigate = useNavigate()

	return (
		<DetailsMenu open={gotofocus} setOpen={setGotoFocus} closeOnSubmit={false}>
			<DetailsMenuTrigger
				open={gotofocus}
				className={cn(
					'w-48 rounded-md bg-background dark:border-accent',
					className,
				)}
			>
				<Icon name="new-window">
					<span>Go To</span>
				</Icon>
				<Shortcut
					className="bg-muted"
					char="g"
					focus={gotofocus}
					setFocus={setGotoFocus}
				/>
			</DetailsMenuTrigger>
			<DetailsPopup className="mx-6 w-48">
				<Command>
					<CommandInput divClassName={cn('hidden',isDocument && 'flex')} ref={inputRef} />
					<CommandList className="no-scrollbar">
						<CommandGroup className="flex flex-col rounded-md">
							{navList.map(({ name, icon, isLabel, link }) => {
								return !isLabel ? (
									<CommandItem
										key={link}
										value={name}
										className="m-0 p-0"
										onSelect={() => navigate(`${link}`)}
									>
										<Link
											key={link}
											to={link!}
											className={cn(
												'my-0.5 flex h-1 items-center justify-start gap-2 rounded-sm px-2 py-4 hover:bg-accent',
											)}
										>
											<Icon name={icon as IconName}>
												{textTruncate(name, 18)}
											</Icon>
										</Link>
									</CommandItem>
								) : null
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</DetailsPopup>
		</DetailsMenu>
	)
}
