import prisma from '@/app/api/prisma'
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";
import { get } from 'http';

/**
 * 更新辅导员
 * name指定班级 guider指定新数据
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

	const name =params.get('name') as string
	const guider = params.get('guider') as string

	const response = await prisma.class.update({
		where: {
			class_name: name
		},
		data: {
			class_guider: guider
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




