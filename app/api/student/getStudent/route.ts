import {NextRequest, NextResponse} from 'next/server'
import prisma from "@/app/api/prisma";

/**
 * 通过名字或学号查询学生信息
 * <string>student_name || <string>student_number
 * 判断传入的参数有谁，分别调用不同的方法
 * 返回一个学生结构体 -> student
 */

export async function GET(request: NextRequest) {

  const params = request.nextUrl.searchParams
  if (params.get('student_name') && params.get('student_number')) {

    const name = params.get('student_name') as string
    const number = params.get('student_number') as string
    return await checkBy2(name, number)
  }
  else if (params.get('student_name')) {

    const name = params.get('student_name') as string
    return await checkByName(name)
  }
  else {

    const number = params.get('student_number') as string
    return await checkByNumber(number)
  }
}

async function checkByName(name: string) {
  const user = await prisma.student.findMany({
    where: {
      student_name: name
    }
  })
  if (user.length < 1) {
    return NextResponse.json({
      status: 'error',
      code: 200,
      data: {},
      errors: 'no such student',
      message: 'Cannot find this student in database'
    })
  }
  else {
    return NextResponse.json({
      status: 'success',
      code: 200,
      data: {user},
      errors: null,
      message: 'Successfully find the student in database',
    })
  }

}

async function checkByNumber(number: string) {
  const user = await prisma.student.findMany({
    where: {
      student_number: number
    }
  })
  if (user.length < 1) {
    return NextResponse.json({
      status: 'error',
      code: 200,
      data: {},
      errors: 'no such student',
      message: 'Cannot find this student in database'
    })
  }
  else {
    return NextResponse.json({
      status: 'success',
      code: 200,
      data: {user},
      errors: null,
      message: 'Successfully find the student in database',
    })
  }
}

async function checkBy2(name: string, number: string) {
  const user = await prisma.student.findMany({
    where: {
      student_name: name,
      student_number: number
    }
  })
  if (user.length < 1) {
    return NextResponse.json({
      status: 'error',
      code: 200,
      data: {},
      errors: 'no such student',
      message: 'Cannot find this student in database'
    })
  }
  else {
    return NextResponse.json({
      status: 'success',
      code: 200,
      data: {user},
      errors: null,
      message: 'Successfully find the student in database',
    })
  }
}
