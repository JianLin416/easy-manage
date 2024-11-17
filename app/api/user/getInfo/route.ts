import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const jwt_secret = process.env.JWT_SECRET as string;

  let token = request.headers.get('authorization');
  if (!token) {
    return NextResponse.json({
      status: 'error',
      code: 401,
      errors: 'no token',
      message: 'no token provided, please login first',
    });
  }
  token = token.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, jwt_secret);
    return NextResponse.json({
      status: 'success',
      code: 200,
      data: decodedToken,
      errors: null,
      message: 'successfully fetched user info',
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      code: 401,
      errors: 'invalid token',
      message: 'token invalid, please login',
    });
  }
}
