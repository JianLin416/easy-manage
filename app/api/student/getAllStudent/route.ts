import prisma from '@/app/api/prisma'
import { student } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 查询全部学生
 * page选择页数 limit选择单页显示数量
 *
 * 返回体
 * {
 *   status: 'success',
 *   code: 200,
 *   data: {
 *   	 students,
 *   	 pagination: {
 *   	   totalStudents, // 学生总数
 *   	   totalPages, // 总页数
 *   	   currentPage: page, // 当前页
 *   	   limit // 单页显示量
 *   	 }
 *   },
 *   errors: null,
 *   message: 'Successfully get',
 * }
 */

export async function GET(request: NextRequest) {

	const params = request.nextUrl.searchParams

	const page = parseInt(params.get('page') || '1')
	const limit = parseInt(params.get('limit') || '20')

	const skip = (page - 1) * limit

	const students: student[] = await prisma.student.findMany({
		skip,
		take: limit
	})

	const totalStudents = await prisma.student.count()
	const totalPages = Math.ceil(totalStudents / limit)

	return NextResponse.json({
		status: 'success',
		code: 200,
		data: {
			students,
			pagination: {
				totalStudents,
				totalPages,
				currentPage: page,
				limit
			}
		},
		errors: null,
		message: 'Successfully get'
	})
}
