import prisma from '@/app/api/prisma'
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken"

/**
 * 删除指定教师
 * id指定教师
 *
 * 返回体
 * {
 *   status: 'success',
 *   code: 200,
 *   errors: null,
 *   message: 'Successfully removed',
 * }
 */

const jwt_secret = process.env.JWT_SECRET as string

export async function DELETE(request: NextRequest) {
	
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

	const id = parseInt(params.get('id') as string)

	const response = await prisma.teacher.delete({
		where: {
			teacher_id: id
		},
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

