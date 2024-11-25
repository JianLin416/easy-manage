import prisma from '@/app/api/prisma'
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

/**
 * 获取全部系部
 *
 * 返回体
 * {
 *   status: 'success',
 *   code: 200,
 *	 departments
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

	const departments = await prisma.department.findMany({
		select: {
			department_name: true,
		},
	})

	const depNames = departments.map(department => department.department_name)

	return NextResponse.json({
		status: 'success',
		code: 200,
		departments: depNames,
		errors: null,
		message: 'Successfully get'
	})
}

