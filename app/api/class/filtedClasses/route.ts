import prisma from '@/app/api/prisma'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 通过专业筛选班级
 * page选择页数 limit选择单页显示数量
 * department选择系部
 *
 * 返回体
 * {
 *   status: 'success' || 'error',
 *   code: 200,
 *   data: {
 *   	 classes,
 *   	 pagination: {
 *   	   totalClasses, // 教师总数
 *   	   totalPages, // 总页数
 *   	   currentPage: page, // 当前页
 *   	   limit // 单页显示量
 *   	 }
 *   },
 *   errors: null || 'no classes mach',
 *   message: 'Successfully get' || 'Cannot find matched classes in database',
 * }
 */

export async function GET(request: NextRequest) {

  const params = request.nextUrl.searchParams

  const page = parseInt(params.get('page') || '1')
  const limit = parseInt(params.get('limit') || '20')

  const skip = (page - 1) * limit

  const classes = await prisma.renamedclass.findMany({
    where: {
      department_name: params.get('department_name'),
    },
    skip,
    take: limit
  })

  const totalClasses = await prisma.renamedclass.count({
    where: {
      department_name: params.get('department_name') as string,
    },
  })
  const totalPages = Math.ceil(totalClasses / limit) || 1

  if (classes.length > 0) return NextResponse.json({
    status: 'success',
    code: 200,
    data: {
      classes,
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

  else return NextResponse.json({
    status: 'error',
    code: 200,
    data: {
      classes,
      pagination: {
        totalClasses, // 班级总数
        totalPages, // 总页数
        currentPage: page, // 当前页
        limit // 单页显示量
      }
    },
    errors: 'no classes mach',
    message: 'Cannot find matched classes in database',
  })
}
