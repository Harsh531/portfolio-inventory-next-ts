import {z} from "zod"

export const projectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  techStack: z.array(z.string()),
  githubUrl: z.url().optional(),
  liveUrl: z.url().optional(),
  challenges: z.string().optional(),
  learnings: z.string().optional()
})

export const profileSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string().min(20),
  skills: z.array(z.string()),
  resumeUrl: z.url().optional(),
  experience: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      description: z.string()
    })
  )
})