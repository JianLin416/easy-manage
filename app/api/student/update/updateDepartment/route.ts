import prisma from '@/app/api/prisma'
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

/**
 * 更新学生系部
 * student_card指定学生 department指定新数据
 *
 * 返回体
 * {
 *   status: 'success',
 *   code: 200,
 *   errors: null,
 *   message: 'Successfully update',
 * }
 */

const jwt_secret = process.env.JWT_SECRET as string

export async function PUT(request: NextRequest) {

	let token: any = request.headers.get('authorization')

	if (!token) {
		return NextResponse.json({
			status: 'error',
			code: 200,
			errors: 'no token',
			message: 'no token provided, please login first',
		})
	}
	token = token.split(' ')[1]

	try {
		token = jwt.verify(token, jwt_secret)

		if (token.user_role === "guider") {
			return NextResponse.json({
				status: 'error',
				code: 200,
				errors: 'invalid role',
				message: 'not allow guider to do this'
			})
		}
	}
	catch (error) {
		return NextResponse.json({
			status: 'error',
			code: 200,
			errors: 'invalid token',
			message: 'token invalid, please login',
		})
	}

	const params = request.nextUrl.searchParams

	const student_card =params.get('student_card') as string
	const department = params.get('department') as string

	const response = await prisma.student.update({
		where: {
			student_card: student_card
		},
		data: {
			department_name: department
		}
	})

	if (response) {
		return NextResponse.json({
			status: 'success',
			code: 200,
			errors: null,
			message: 'Successfully get'
		})
	}

	else {
		return NextResponse.json({
			status: 'error',
			code: 200,
			errors: 'error',
			message: 'Server error'
		})
	}
}


