"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/projects")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(setProjects)
      .catch(error => {
        console.error("Failed to fetch projects:", error)
        // Optionally set an error state
      })
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/admin/projects/new">
          <Button>Add Project</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {projects.map(project => (
          <div
            key={project._id}
            className="border p-4 rounded-lg"
          >
            <h2 className="font-semibold">{project.title}</h2>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}