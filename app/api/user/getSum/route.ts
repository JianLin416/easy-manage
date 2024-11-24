import prisma from '@/app/api/prisma'
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

/**
 * 获取班级、学生、教师总量
 *
 * 返回体
 * {
 *   status: 'success',
 *   code: 200,
 *   data: {
 *   	 class_sum,
 *   	 student_sum,
 *		 teacher_sum
 *   },
 *   errors: null,
 *   message: 'Successfully get',
 * }
 */

const jwt_secret = process.env.JWT_SECRET as string

export async function GET(request: NextRequest) {

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

	let class_sum
	let student_sum
	let teacher_sum

	if (token.department_name) {

		class_sum = await prisma.class.count({
			where: {
				department_name: token.department_name,
			},
		})

		student_sum = await prisma.student.count({
			where: {
				department_name: token.department_name,
			},
		})
	}
	else {

		class_sum = await prisma.class.count()

		student_sum = await prisma.student.count()
	}

	teacher_sum = await prisma.teacher.count()

	return NextResponse.json({
		status: 'success',
		code: 200,
		data: {
			class_sum: class_sum,
			student_sum: student_sum,
			teacher_sum: teacher_sum
		},
		errors: null,
		message: 'Successfully get'
	})
}

