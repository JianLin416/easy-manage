import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/app/api/prisma"
import jwt from "jsonwebtoken";

/**
 * 添加班级信息
 * {
 *   department: 系部,
		 class: 班名,
		 teacher: 班主任,
		 guider: 辅导员
 * }
 *
 * 返回体
 * {
 *   status: 'error' || 'success',
 *   code: 200,
 *   errors: 'create failed' || null,
 *   message: 'failed to create' || 'Successfully find the student in database',
 * }
 */

export async function POST(request: NextRequest) {

	const jwt_secret = process.env.JWT_SECRET as string

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
		token = jwt.verify(token, jwt_secret);
	}
	catch (error) {
		return NextResponse.json({
			status: 'error',
			code: 200,
			errors: 'invalid token',
			message: 'token invalid, please login',
		})
	}

	const body = await request.json()

	const response = await prisma.class.create({

		data: {
			class_name: body.class,
			department_name: body.department,
			class_master: body.teacher,
			class_guider: body.guider
		}
	})

	if (response) {
		return NextResponse.json({
			status: 'success',
			code: 200,
			errors: null,
			message: 'Successfully created'
		})
	}

	else {
		return NextResponse.json({
			status: 'error',
			code: 200,
			errors: 'create failed',
			message: 'failed to create student'
		})
	}
}
