import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/app/api/prisma"
import jwt from "jsonwebtoken";

/**
 * 添加学生信息
 * {
 *    name: 姓名,
 *    gender: 性别,
 *    phone: 电话,
 *    department: 系部,
 *    major: 专业,
 *    number: 学号,
 *    IDcard: 身份证,
 *    birth: 生日,
 *    home: 住址
 *  }
 *
 * 返回体
 * {
 *   status: 'error' || 'success',
 *   code: 200,
 *   errors: 'create failed' || null,
 *   message: 'failed to create student' || 'Successfully find the student in database',
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

  const response = await prisma.student.create({

    data: {
      student_name: body.name,
      student_gender: body.gender,
      department_name: body.department,
      student_major: body.major,
      student_number: body.number,
      student_card: body.IDcard,
      student_birth: body.birth,
      student_home: body.home
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
