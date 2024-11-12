import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/app/api/prisma"

/**
 * 通过名字查询教师信息
 * <string>teacher_name
 *
 * 返回体
 * {
 *   status: 'error' || 'success',
 *   code: 200,
 *   data: {
 *     teachers,
 *     pagination: {
 *       totalTeachers, // 教师总数
 *       totalPages, // 总页数
 *       currentPage: page, // 当前页
 *       limit // 单页显示量
 *     }
 *   },
 *   errors: 'no such teacher' || null,
 *   message: 'Cannot find this teacher in database' || 'Successfully find the teacher in database',
 * }
 */

export async function GET(request: NextRequest) {

  const params = request.nextUrl.searchParams

  const name = params.get('teacher_name') as string

  const teachers = await prisma.teacher.findMany({
    where: {
      teacher_name: name
    }
  })
  if (teachers.length < 1) {
    return NextResponse.json({
      status: 'error',
      code: 200,
      data: {
        pagination: {
          totalTeachers: 0,
          totalPages: 1,
          currentPage: 1,
          limit: 0
        }
      },
      errors: 'no such teacher',
      message: 'Cannot find this teacher in database'
    })
  }
  else {
    return NextResponse.json({
      status: 'success',
      code: 200,
      data: {
        teachers,
        pagination: {
          totalTeachers: 0,
          totalPages: 1,
          currentPage: 1,
          limit: 0
        }
      },
      errors: null,
      message: 'Successfully find the teacher in database',
    })
  }
}

