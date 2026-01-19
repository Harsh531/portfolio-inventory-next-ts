"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {useRouter} from "next/navigation"


export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin() {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        })

        console.log(res, "login response")

        if (res.ok) {
            router.push("/admin/projects")
            // window.location.href = "/admin/projects"
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="min-w-full max-w-87.5 space-y-4">
                <h1 className="text-2xl font-bold text-center">Admin Login</h1>
                <div className="flex flex-col gap-2 space-y-4 min-w-full">
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant={"outline"} onClick={handleLogin} className="w-full">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}