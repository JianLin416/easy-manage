import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/app/api/prisma"
import {Renamedclass} from "@prisma/client";

/**
 * 通过班名查询班级信息
 * <string>class_name
 *
 * 返回体
 * {
 *   status: 'error' || 'success',
 *   code: 200,
 *   data: {
 *     classes,
 *     pagination: {
 *       totalClasses, // 班级总数
 *       totalPages, // 总页数
 *       currentPage: page, // 当前页
 *       limit // 单页显示量
 *     }
 *   },
 *   errors: 'no such class' || null,
 *   message: 'Cannot find this class in database' || 'Successfully find the class in database',
 * }
 */

export async function GET(request: NextRequest) {

  const params = request.nextUrl.searchParams

  const name = params.get('class_name') as string

  const classes: Renamedclass[] = await prisma.renamedclass.findMany({
    where: {
      class_name: name
    }
  })
  if (classes.length < 1) {
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
      errors: 'no such class',
      message: 'Cannot find this class in database'
    })
  }
  else {
    return NextResponse.json({
      status: 'success',
      code: 200,
      data: {
        classes,
        pagination: {
          totalTeachers: 0,
          totalPages: 1,
          currentPage: 1,
          limit: 0
        }
      },
      errors: null,
      message: 'Successfully find the class in database',
    })
  }
}

