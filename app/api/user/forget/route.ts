import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/api/prisma";

/**
 * 接收体
 * {
 *   user_account: string,
 *   user_password: string,
 * }
 * 发送体
 * {
 *   status: 'success' || 'error,
 *   code: 200,
 *   errors: null || 'wrong',
 *   message: 'Successfully changed' || 'wrong'
 * }
 */


interface changeUser {
  user_account: string,
  user_password: string,
}

export async function POST(request: NextRequest) {

  let user: changeUser = await request.json();

  const checkResult = await prisma.user.findUnique({
    where: {
      user_account: user.user_account
    }
  })

  if (checkResult) {

    const updateUser = await prisma.user.update({
      where: {
        user_account: user.user_account
      },
      data: {
        user_password: user.user_password
      }
    })

    if (updateUser) {
      return NextResponse.json({
        status: "success",
        code: 200,
        errors: null,
        message: 'successfully changed',
      })
    }
    else return NextResponse.json({
      status: 'error',
      code: 200,
      errors: 'database error',
      message: 'database errors,please try again later'
    })
  }
  else {
    return NextResponse.json({
      status: 'error',
      code: 200,
      errors: 'no user',
      message: 'no such user in database',
    })
  }
}
