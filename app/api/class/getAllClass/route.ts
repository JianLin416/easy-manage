import prisma from '@/app/api/prisma'
import { Renamedclass } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

/**
 * 查询全部班级
 * page选择页数 limit选择单页显示数量
 *
 * 返回体
 * {
 *   status: 'success',
 *   code: 200,
 *   data: {
 *   	 classes,
 *     departments,
 *   	 pagination: {
 *   	   totalClasses, // 班级总数
 *   	   totalPages, // 总页数
 *   	   currentPage: page, // 当前页
 *   	   limit // 单页显示量
 *   	 }
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

  const params = request.nextUrl.searchParams

  const page = parseInt(params.get('page') || '1')
  const limit = parseInt(params.get('limit') || '20')

  const skip = (page - 1) * limit

  let classes: Renamedclass[]
  let departments
  let totalClasses

  if (token.department_name) {

    classes = await prisma.renamedclass.findMany({
      where: {
        department_name: token.department_name,
      },
      skip,
      take: limit
    })

    departments = await prisma.renamedclass.findMany({
      select: {
        department_name: true,
      },
      where: {
        department_name: token.department_name,
      },
    })

    totalClasses = await prisma.renamedclass.count({
      where: {
        department_name: token.department_name,
      },
    })
  }
  else {

    classes = await prisma.renamedclass.findMany({
      skip,
      take: limit
    })

    departments = await prisma.renamedclass.findMany({
      select: {
        department_name: true,
      },
    })

    totalClasses = await prisma.renamedclass.count()
  }

  departments = Array.from(new Set(
    departments.map(
      (classes: any) => classes.department_name
    )
  ))

  const totalPages = Math.ceil(totalClasses / limit)

  return NextResponse.json({
    status: 'success',
    code: 200,
    data: {
      classes,
      departments,
      pagination: {
        totalClasses,
        totalPages,
        currentPage: page,
        limit
      }
    },
    errors: null,
    message: 'Successfully get'
  })
}
