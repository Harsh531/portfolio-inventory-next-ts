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
  try {
    const body = await req.json()

    const settings = await Settings.findOneAndUpdate(
      {},
      body,
      { upsert: true, new: true }
    )

    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}