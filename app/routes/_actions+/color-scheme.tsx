import {
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
} from '@remix-run/node'
import { safeRedirect } from '@/utils/servers/http.server'
import { setTheme, type Theme } from '@/utils/servers/theme.server'

export async function loader({ request }: LoaderFunctionArgs) {
	return safeRedirect(request.headers.get('Referer') ?? '/', { status: 303 })
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const colorScheme = formData.get('colorScheme')

	return safeRedirect(formData.get('returnTo'), {
		headers: { 'set-cookie': setTheme(colorScheme as Theme | 'system') },
	})
}
