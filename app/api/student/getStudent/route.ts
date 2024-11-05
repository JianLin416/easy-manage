import { NextRequest } from 'next/server'

/**
 * 通过名字或学号查询学生信息
 * student_name || student_number
 * 判断传入的参数有谁，分别调用不同的方法
 * 返回一个学生结构体 -> student
 */

export async function GET(request: NextRequest) {

  const params = request.nextUrl.searchParams
  if (params.get('student_name') && params.get('student_number')) {

  } else if (params.get('student_name')) {

  } else {

  }


}