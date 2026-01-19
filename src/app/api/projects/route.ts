import { connectDB } from "@/lib/db";
import { projectSchema } from "@/lib/zod";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB()
  const projects = await Project.find({}).sort({ createdAt: -1 })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  const parsed = projectSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(parsed.error, { status: 400 })
  }

  const project = await Project.create(parsed.data)
  return NextResponse.json(project)
}