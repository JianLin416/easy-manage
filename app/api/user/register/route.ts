import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/prisma";
import type { user_user_role } from "@prisma/client";

/**
 * 接收体
 * {
 *   user_role: string ENUM('admin', 'director', 'teacher', 'guider'),
 *   department_name: string,
 *   user_name: string,
 *   user_account: string,
 *   user_password: string,
 * }
 * 发送体
 * {
 *   status: 'success' || 'error,
 *   code: 200,
 *   errors: null || 'already exists',
 *   message: 'Successfully registered' || 'user already exists in database'
 * }
 */

interface registerUser {
  user_role: user_user_role
  department_name: string
  user_name: string
  user_account: string
  user_password: string
}

export async function POST(request: NextRequest) {

  let user: registerUser = await request.json();

  const checkResult = await prisma.user.findMany({
    where: {
      user_account: user.user_account
    }
  })

  if (checkResult.length < 1) {
    await prisma.user.create({
      data: {
        user_role: user.user_role,
        department_name: user.department_name,
        user_name: user.user_name,
        user_account: user.user_account,
        user_password: user.user_password,
      }
    })

    return NextResponse.json({
      status: "success",
      code: 200,
      errors: null,
      message: 'successfully registered'
    })
  }
  else {
    return NextResponse.json({
      status: 'error',
      code: 200,
      errors: 'already exists',
      message: 'user already exists in database',
    })
  }
}