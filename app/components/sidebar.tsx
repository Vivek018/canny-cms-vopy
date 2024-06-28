import { Form, Link, NavLink, useLocation } from '@remix-run/react'
import { sideNavList } from '@/constant'
import { cn, textTruncate } from '@/utils/misx'
import { type Theme } from '@/utils/servers/theme.server'
import { useOptimisticThemeMode } from '@/utils/theme'
import { type IconName } from '~/icon-name'
import {
	DetailsMenu,
	DetailsMenuLabel,
	DetailsMenuSeparator,
	DetailsMenuTrigger,
	DetailsPopup,
} from './details-menu'
import { GotoSelector } from './goto-selector'
import { Button } from './ui/button'
import { Icon } from './ui/icon'

type SidebarProps = {
	className?: string
	theme: Theme | 'system'
}

export function Sidebar({ className, theme }: SidebarProps) {
	const optimisticMode = useOptimisticThemeMode()
	const currentTheme = optimisticMode ?? theme ?? 'system'
	return (
		<aside
			className={cn(
				'flex h-full flex-col gap-3 overflow-hidden bg-muted text-muted-foreground',
				className,
			)}
		>
			<Link
				to="/"
				className="mx-auto mb-3 mt-[25px] flex w-min cursor-pointer gap-3 px-6"
			>
				<h1 className=" w-max text-2xl font-extrabold uppercase tracking-wider">
					CANNY CMS
				</h1>
			</Link>
			<GotoSelector className="ml-6 mt-2" />
			<div className="no-scrollbar flex flex-col gap-4 overflow-scroll px-6">
				<ul className="flex w-full flex-col">
					{sideNavList.map(({ icon, isLabel, name, link }, key) => {
						return !isLabel ? (
							<NavLink
								to={link ?? ''}
								key={key}
								className={({ isActive }) =>
									cn(
										'my-0.5 flex cursor-pointer rounded-sm py-1.5 text-sm tracking-wide first:mt-0 hover:bg-accent',
										isActive
											? 'cursor-auto bg-secondary shadow-sm hover:bg-secondary'
											: '',
									)
								}
							>
								<Icon name={icon as IconName} className="ml-2.5">
									<li className="capitalize">{name}</li>
								</Icon>
							</NavLink>
						) : (
							<h2
								key={name}
								className="mt-1.5 py-1 text-xs opacity-70 first:mt-0 first:pt-0"
							>
								{name}
							</h2>
						)
					})}
				</ul>
			</div>
			<div className="mb-6 mt-auto flex w-full flex-row items-center justify-between border-t border-foreground p-2">
				<DetailsMenu className="static">
					<DetailsMenuTrigger
						className={cn(
							'flex w-max flex-1 cursor-pointer items-center gap-2 rounded-sm border-none py-2 pl-3 pr-4 text-sm tracking-wide',
						)}
					>
						<Icon name="avatar" size="xl" />
						<div>
							<h2 className="mb-1 leading-none">
								{textTruncate(' Vivek Chauhan', 21)}
							</h2>
							<p className="font-mono text-[10px] capitalize leading-none tracking-tight opacity-60">
								{textTruncate('Account Manager', 21)}
							</p>
						</div>
					</DetailsMenuTrigger>
					<DetailsPopup className="bottom-20 left-1 w-48">
						<DetailsMenuLabel className="px-1.5">My Account</DetailsMenuLabel>
						<DetailsMenuSeparator />
						<AccountMenuLink
							link="/profile"
							iconName="person"
							label="My Profile"
						/>
						<AccountMenuLink
							link="/help-feedback"
							iconName="question-mark-circled"
							label="Help / Feedback"
						/>
						<AccountMenuLink link="/logout" iconName="exit" label="Log out" />
					</DetailsPopup>
				</DetailsMenu>
				<ThemeSwitch theme={currentTheme} />
			</div>
		</aside>
	)
}

export function AccountMenuLink({
	link,
	label,
	iconName,
}: {
	link: string
	label: string
	iconName: IconName
}) {
	return (
		<Link
			to={link}
			className="focus:bg-muted flex items-center gap-2 rounded-md px-1.5 py-2 hover:bg-muted"
		>
			<Icon name={iconName} />
			<span>{label}</span>
		</Link>
	)
}

export function ThemeSwitch({ theme }: { theme: Theme | 'system' }) {
	const location = useLocation()
	const iconName: IconName =
		theme === 'system' ? 'laptop' : theme === 'dark' ? 'moon' : 'sun'

	return (
		<DetailsMenu className="static">
			<DetailsMenuTrigger className="w-min border-none p-3.5">
				<Icon size="sm" name={iconName} />
			</DetailsMenuTrigger>
			<DetailsPopup className="bottom-20 w-36">
				<Form
					preventScrollReset
					replace
					method="POST"
					action="color-scheme"
					className="flex h-full flex-col gap-1"
				>
					<input
						type="hidden"
						name="returnTo"
						value={location.pathname + location.search}
						readOnly
					/>
					<ColorSchemeButton
						icon="sun"
						label="Light"
						value="light"
						name="colorScheme"
						theme={theme}
					/>
					<ColorSchemeButton
						icon="moon"
						label="Dark"
						value="dark"
						name="colorScheme"
						theme={theme}
					/>
					<ColorSchemeButton
						icon="laptop"
						label="System"
						value="system"
						name="colorScheme"
						theme={theme}
					/>
				</Form>
			</DetailsPopup>
		</DetailsMenu>
	)
}

const ColorSchemeButton = ({
	theme,
	label,
	value,
	icon,
	name,
	...props
}: {
	theme: Theme | 'system'
	label: string
	value: Theme | 'system'
	icon: 'sun' | 'moon' | 'laptop'
	name: string
}) => {
	return (
		<Button
			variant="ghost"
			name={name}
			value={value}
			{...props}
			disabled={theme === value}
			className="flex h-9 justify-start gap-2 py-1 font-normal"
		>
			<Icon name={icon} />
			{label}
		</Button>
	)
}
