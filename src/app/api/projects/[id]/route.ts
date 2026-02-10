import { connectDB } from "@/lib/db";
import { projectSchema } from "@/lib/zod";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB()
  try {
    const body = await req.json()
    const { id } = await params

    const parsed = projectSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(parsed.error, { status: 400 })
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      parsed.data,
      { new: true }
    )

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB()
  const { id } = await params
  await Project.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}