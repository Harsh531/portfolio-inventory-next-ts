import { connectDB } from "@/lib/db";
import { profileSchema } from "@/lib/zod";
import Profile from "@/models/Profile";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB()
  const profile = await Profile.findOne()
  return NextResponse.json(profile)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  const parsed = profileSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(parsed.error, { status: 400 })
  }

  const profile = await Profile.findOneAndUpdate(
    {},
    parsed.data,
    { upsert: true, new: true }
  )

  return NextResponse.json(profile)
}