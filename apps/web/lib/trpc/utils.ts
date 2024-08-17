const getBaseUrl = (): string => {
	const localhost =
		process.env['NEXT_PUBLIC_NESTJS_SERVER'] ?? 'http://localhost:4000';
	if (typeof window !== 'undefined')
		// browser should use relative path
		return localhost;
	if (process.env['VERCEL_URL'])
		// reference for vercel.com
		return process.env['VERCEL_URL'];
	if (process.env['RENDER_INTERNAL_HOSTNAME'])
		// reference for render.com
		return `http://${process.env['RENDER_INTERNAL_HOSTNAME']}:${process.env['PORT']}`;
	// assume localhost
	return localhost;
};

export const TRPC_URL = getBaseUrl() + '/trpc';
