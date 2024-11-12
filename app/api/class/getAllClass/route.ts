import prisma from '@/app/api/prisma'
import { Renamedclass } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

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

export async function GET(request: NextRequest) {

  const params = request.nextUrl.searchParams

  const page = parseInt(params.get('page') || '1')
  const limit = parseInt(params.get('limit') || '20')

  const skip = (page - 1) * limit

  const classes: Renamedclass[] = await prisma.renamedclass.findMany({
    skip,
    take: limit
  })

  let departments = await prisma.renamedclass.findMany({
    select: {
      department_name: true,
    }
  })

  departments = Array.from(new Set(
    departments.map(
      (classes: any) => classes.department_name
    )
  ))

  const totalClasses = await prisma.renamedclass.count()
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
