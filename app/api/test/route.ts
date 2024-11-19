import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  let req = await request.json();

  return NextResponse.json({
    status: "success",
    code: 200,
    data: req,
    errors: null,
    message: 'successfully login',

  });
}