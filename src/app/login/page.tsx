"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApi } from "@/lib/useApi"

export default function LoginPage() {
    const router = useRouter();
    const { getApiUrl } = useApi()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleLogin() {
        setLoading(true)
        setError(null)
        
        try {
            const url = getApiUrl("/api/auth/login")
            console.log("🔐 Logging in to:", url)
            
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            console.log("📡 Response status:", res.status)

            if (!res.ok) {
                const errorData = await res.json()
                console.error("❌ Login error:", errorData)
                setError(errorData.error || "Login failed. Please try again.")
                setLoading(false)
                return
            }

            const data = await res.json()
            console.log("✅ Login successful!", data)
            router.push("/admin/projects")
        } catch (err: any) {
            const errorMsg = err?.message || "Network error. Please try again."
            console.error("🔥 Login error:", err)
            setError(errorMsg)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="min-w-full max-w-87.5 space-y-4">
                <h1 className="text-2xl font-bold text-center">Admin Login</h1>
                
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                
                <div className="flex flex-col gap-2 space-y-4 min-w-full">
                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <Button 
                        variant={"outline"} 
                        onClick={handleLogin} 
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </div>
            </div>
        </div>
    )
}