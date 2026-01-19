"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AdminProfilePage() {
    const [profile, setProfile] = useState<any>({
        name: "",
        title: "",
        bio: "",
        skills: "",
        resumeUrl: ""
    })

    useEffect(() => {
        fetch("/api/profile")
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setProfile({
                        name: data.name || "",
                        title: data.title || "",
                        bio: data.bio || "",
                        skills: data.skills?.join(",") || "",
                        resumeUrl: data.resumeUrl || ""
                    })
                }
            })
            .catch(error => console.error("Failed to fetch profile:", error))
    }, [])

    async function save() {
        try {
            const res = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify({
                    ...profile,
                    skills: profile.skills.split(","),
                    experience: []
                })
            })
            if (!res.ok) {
                const errorData: any = await res.json();
                const errorMessage = errorData.message || "Failed to save profile";
                console.log(errorMessage, "errorData")
                throw new Error(errorMessage);
            }

            alert("Profile updated")
        } catch (error) {
            console.error("Failed to save profile:", error)
            // alert("Failed to save profile")
        }
    }

    return (
        <div className="max-w-xl space-y-4 flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Profile</h1>

            <Input
                placeholder="Name"
                value={profile.name}
                onChange={e =>
                    setProfile({ ...profile, name: e.target.value })
                }
            />

            <Input
                placeholder="Title"
                value={profile.title}
                onChange={e =>
                    setProfile({ ...profile, title: e.target.value })
                }
            />

            <Textarea
                placeholder="Bio"
                value={profile.bio}
                onChange={e =>
                    setProfile({ ...profile, bio: e.target.value })
                }
            />

            <Input
                placeholder="Skills (comma separated)"
                value={profile.skills}
                onChange={e =>
                    setProfile({ ...profile, skills: e.target.value })
                }
            />

            <Input
                placeholder="Resume URL"
                value={profile.resumeUrl}
                onChange={e =>
                    setProfile({ ...profile, resumeUrl: e.target.value })
                }
            />

            <Button onClick={save}>Save</Button>
        </div>
    )
}