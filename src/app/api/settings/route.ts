import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Settings from "@/models/Settings"

export async function GET() {
  await connectDB()
  const settings = await Settings.findOne()
  return NextResponse.json(settings)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  const settings = await Settings.findOneAndUpdate(
    {},
    body,
    { upsert: true, new: true }
  )

  return NextResponse.json(settings)
}