"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NewProjectPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        description: "",
        techStack: ""
    })

    async function submit() {
        const res = await fetch("/api/projects", {
            method: "POST",
            body: JSON.stringify({
                ...form,
                techStack: form.techStack.split(",")
            })
        })

        if (res.ok) {
            router.push("/admin/projects")
            // window.location.href = "/admin/projects"
        }

    }

    return (
        <div className="max-w-xl space-y-4">
            <h1 className="text-xl font-bold">New Project</h1>

            <Input
                placeholder="Title"
                value={form.title}
                onChange={e =>
                    setForm({ ...form, title: e.target.value })
                }
            />

            <Textarea
                placeholder="Description"
                value={form.description}
                onChange={e =>
                    setForm({ ...form, description: e.target.value })
                }
            />

            <Input
                placeholder="Tech stack (comma separated)"
                value={form.techStack}
                onChange={e =>
                    setForm({ ...form, techStack: e.target.value })
                }
            />

            <Button onClick={submit}>Create</Button>
        </div>
    )
}