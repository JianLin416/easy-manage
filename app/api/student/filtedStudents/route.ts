import prisma from '@/app/api/prisma'
import { Student } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 通过专业或班级筛选学生
 * page选择页数 limit选择单页显示数量
 * department选择系部 class选择班级
 *
 * 返回体
 * {
 *   status: 'success' || 'error',
 *   code: 200,
 *   data: {
 *   	 students,
 *   	 pagination: {
 *   	   totalStudents, // 学生总数
 *   	   totalPages, // 总页数
 *   	   currentPage: page, // 当前页
 *   	   limit // 单页显示量
 *   	 }
 *   },
 *   errors: null || 'no students mach',
 *   message: 'Successfully get' || 'Cannot find matched students in database',
 * }
 */

export async function GET(request: NextRequest) {

  const params = request.nextUrl.searchParams

  const page = parseInt(params.get('page') || '1')
  const limit = parseInt(params.get('limit') || '20')

  const skip = (page - 1) * limit

  let students: Student[]
  let totalStudents: number
  if (params.get('department') && params.get('class')) {
    students = await prisma.student.findMany({
      where: {
        student_department: params.get('department') as string,
        class_name: params.get('class')
      },
      skip,
      take: limit
    })

    totalStudents = await prisma.student.count({
      where: {
        student_department: params.get('department') as string,
        class_name: params.get('class'),
      },
    })

  } else if (params.get('department')) {
    students = await prisma.student.findMany({
      where: {
        student_department: params.get('department') as string,
      },
      skip,
      take: limit
    })

    totalStudents = await prisma.student.count({
      where: {
        student_department: params.get('department') as string,
      },
    })

  } else {
    students = await prisma.student.findMany({
      where: {
        class_name: params.get('class')
      },
      skip,
      take: limit
    })

    totalStudents = await prisma.student.count({
      where: {
        student_department: params.get('class') as string,
      },
    })

  }

  const totalPages = Math.ceil(totalStudents / limit) || 1

  if (students.length > 0) return NextResponse.json({
    status: 'success',
    code: 200,
    data: {
      students,
      pagination: {
        totalStudents,
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
      students,
      pagination: {
        totalStudents, // 学生总数
        totalPages, // 总页数
        currentPage: page, // 当前页
        limit // 单页显示量
      }
    },
    errors: 'no students mach',
    message: 'Cannot find matched students in database',
  })
}
