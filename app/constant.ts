import { type NavList } from 'types'

export const defaultMonth = (new Date().getMonth() + 1).toString()
export const defaultYear = new Date().getFullYear().toString()

export const PAGE_SIZE = 12
export const MAX_DATA_LENGTH = 150

export const sideNavList = [
	{ name: 'Main Menu', isLabel: true },
	{ name: 'Dashboard', link: '/dashboard', icon: 'dashboard', isLabel: false },
	{ name: 'Users', link: '/users', icon: 'avatar', isLabel: false },
	{ name: 'Management', isLabel: true },
	{ name: 'Documents', link: '/documents', icon: 'file-text', isLabel: false },
	{ name: 'Companies', link: '/companies', icon: 'company', isLabel: false },
	{ name: 'Employees', link: '/employees', icon: 'employee', isLabel: false },
	{ name: 'Finance', isLabel: true },
	{ name: 'Advances', link: '/advances', icon: 'lab-timer', isLabel: false },
	{
		name: 'Payment Fields',
		link: '/payment_fields',
		icon: 'input',
		isLabel: false,
	},
	{ name: 'Project Resources', isLabel: true },
	{ name: 'Projects', link: '/projects', icon: 'project', isLabel: false },
	{
		name: 'Project Locations',
		link: '/project_locations',
		icon: 'pin',
		isLabel: false,
	},
	{ name: 'Vehicles', link: '/vehicles', icon: 'rocket', isLabel: false },
] as NavList[]

const sideNavs = sideNavList.filter(item => !item.isLabel).map(item => item)

export const navList = [
	...sideNavs,
	{
		name: 'Profile',
		link: '/profile',
		icon: 'person',
		isLabel: false,
	},
	{
		name: 'Add Users',
		link: '/users/upsert',
		icon: 'plus-circled',
		isLabel: false,
	},
	{
		name: 'Add Employee',
		link: '/employees/upsert',
		icon: 'plus-circled',
		isLabel: false,
	},
	{
		name: 'Add Document',
		link: '/documents/upsert',
		icon: 'plus-circled',
		isLabel: false,
	},
	{
		name: 'Add Company',
		link: '/companies/upsert',
		icon: 'plus-circled',
		isLabel: false,
	},
	{
		name: 'Add Advance',
		link: '/advances/upsert',
		icon: 'plus-circled',
		isLabel: false,
	},
	{
		name: 'Add Payment Field',
		link: '/payment_fields/upsert',
		icon: 'plus-circled',
		isLabel: false,
	},
	{
		name: 'Add Project',
		link: '/projects/upsert',
		icon: 'plus-circled',
		isLabel: false,
	},
	{
		name: 'Add Project Location',
		link: '/project_locations/upsert',
		icon: 'plus-circled',
		isLabel: false,
	},
	{
		name: 'Add Vehicle',
		link: '/vehicles/upsert',
		icon: 'plus-circled',
		isLabel: false,
	},
] as NavList[]

export const booleanArray = [{ value: 'true' }, { value: 'false' }]

export const weekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]

export const singleRouteName: { [key: string]: string } = {
	users: 'user',
	documents: 'document',
	companies: 'company',
	employees: 'employee',
	advances: 'advance_Payment',
	payment_fields: 'payment_Field',
	projects: 'project',
	project_locations: 'project_Location',
	vehicles: 'vehicle',
}

export const importExportEnabled = [
	'users',
	'companies',
	'employees',
	'advances',
	'attendances',
	'payment_fields',
	'projects',
	'project_locations',
	'vehicles',
]


export const routeObjectTitle: { [key: string]: string } = {
	[singleRouteName.users]: 'full_name',
	[singleRouteName.documents]: 'label',
	[singleRouteName.companies]: 'name',
	[singleRouteName.employees]: 'full_name',
	[singleRouteName.advances]: 'label',
	[singleRouteName.payment_fields]: 'name',
	[singleRouteName.projects]: 'name',
	[singleRouteName.project_locations]: 'city',
	[singleRouteName.vehicles]: 'number',
}
