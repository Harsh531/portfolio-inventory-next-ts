import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import { hashPassword } from "@/lib/password"

export async function POST() {
  await connectDB()

  const exists = await User.findOne({ role: "admin" })
  if (exists) {
    return NextResponse.json({ message: "Admin already exists" }, { status: 400 })
  }

  const admin = await User.create({
    email: "admin@portfolio.com",
    password: await hashPassword("admin@1234"),
    role: "admin"
  })

  return NextResponse.json({
    message: "Admin created",
    email: admin.email
  })
}