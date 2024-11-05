import prisma from '@/app/api/prisma'

export async function GET(request: Request) {
	const result = await prisma.test.findMany()
	return new Response(JSON.stringify(result), {status: 200})
}
