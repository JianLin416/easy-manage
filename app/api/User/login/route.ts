import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/api/prisma";
import jwt from 'jsonwebtoken';

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
 *   token: token,
 *   errors: null || 'wrong',
 *   message: 'Successfully login' || 'wrong'
 * }
 */

interface loginUser {
  user_account: string,
  user_password: string,
}

export async function POST (request: NextRequest) {

  let user: loginUser = await request.json();

  const checkResult = await prisma.user.findUnique({
    where: {
      user_account: user.user_account
    }
  })

  if (checkResult) {

    if (user.user_password === checkResult.user_password) {

      const jwt_secret = process.env.JWT_SECRET as string

      const token = jwt.sign({
        user_name: checkResult.department_name,
        user_account: checkResult.user_account,
        user_role: checkResult.user_role,
        department_name: checkResult.department_name,
      }, jwt_secret, {
        expiresIn: "1d"
        }
      )

      return NextResponse.json({
        status: "success",
        code: 200,
        token: token,
        errors: null,
        message: 'successfully login',

      });
    }

    else return NextResponse.json({
      status: "error",
      code: 200,
      errors: 'wrong',
      message: 'wrong password'
    })
  }

  else {
    return NextResponse.json({
      status: 'error',
      code: 200,
      errors: 'no user',
      message: 'on such user in database',
    })
  }
}