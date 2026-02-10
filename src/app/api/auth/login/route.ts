import { signToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { comparePassword } from "@/lib/password";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB()
    
    const { email, password } = await req.json()

    if (!email || !password) {
      console.warn("❌ Login attempt without email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await User.findOne({ email })
    if (!user) {
      console.warn(`❌ Login attempt with non-existent email: ${email}`)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      console.warn(`❌ Login attempt with wrong password for: ${email}`)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log(`✅ Login successful for: ${email}`)

    const token = signToken({
      id: user._id,
      role: user.role
    })

    const response = NextResponse.json({ success: true, email: user.email })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/"
    })

    return response
  } catch (error) {
    console.error("🔥 Login API error:", error)
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}