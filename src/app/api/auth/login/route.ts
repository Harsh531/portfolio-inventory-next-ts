import { signToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { comparePassword } from "@/lib/password";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB()
  try {
    const { email, password } = await req.json()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = signToken({
      id: user._id,
      role: user.role
    })

    const response = NextResponse.json({ success: true })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/"
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}