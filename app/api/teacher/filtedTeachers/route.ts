import prisma from '@/app/api/prisma'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 通过专业筛选教师
 * page选择页数 limit选择单页显示数量
 * department选择系部
 *
 * 返回体
 * {
 *   status: 'success' || 'error',
 *   code: 200,
 *   data: {
 *   	 teachers,
 *   	 pagination: {
 *   	   totalTeachers, // 教师总数
 *   	   totalPages, // 总页数
 *   	   currentPage: page, // 当前页
 *   	   limit // 单页显示量
 *   	 }
 *   },
 *   errors: null || 'no teachers mach',
 *   message: 'Successfully get' || 'Cannot find matched teachers in database',
 * }
 */

export async function GET(request: NextRequest) {

  const params = request.nextUrl.searchParams

  const page = parseInt(params.get('page') || '1')
  const limit = parseInt(params.get('limit') || '20')

  const skip = (page - 1) * limit

  const teachers = await prisma.teacher.findMany({
    where: {
      department_name: params.get('department_name'),
    },
    skip,
    take: limit
  })

  const totalTeachers = await prisma.teacher.count({
    where: {
      department_name: params.get('department_name') as string,
    },
  })
  const totalPages = Math.ceil(totalTeachers / limit) || 1

  if (teachers.length > 0) return NextResponse.json({
    status: 'success',
    code: 200,
    data: {
      teachers,
      pagination: {
        totalTeachers,
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
      teachers,
      pagination: {
        totalTeachers, // 学生总数
        totalPages, // 总页数
        currentPage: page, // 当前页
        limit // 单页显示量
      }
    },
    errors: 'no teachers mach',
    message: 'Cannot find matched teachers in database',
  })
}
