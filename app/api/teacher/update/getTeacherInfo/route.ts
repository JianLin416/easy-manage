import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/app/api/prisma"

/**
 * 通过id获取当前在查询的教师信息
 * <string> id
 *
 * 返回体
 * {
 *   status: 'error' || 'success',
 *   code: 200,
 *   teacher,
 *   errors: 'no such teacher' || null,
 *   message: 'Cannot find this teacher in database' || 'Successfully find the teacher in database',
 * }
 */

export async function GET(request: NextRequest) {

  const params = request.nextUrl.searchParams

  const id = params.get('id') as string
  console.log(id)
  const numberId = parseInt(id)
  console.log(numberId)
  const teacher: any = await prisma.teacher.findFirst({
    where: {
      teacher_id: numberId
    }
  })
  if (!teacher) {
    return NextResponse.json({
      status: 'error',
      code: 200,
      errors: 'no such teacher',
      message: 'Cannot find this teacher in database'
    })
  }
  else {
    return NextResponse.json({
      status: 'success',
      code: 200,
      teacher,
      errors: null,
      message: 'Successfully find the teacher in database',
    })
  }
}


