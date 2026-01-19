"use client"

import Link from "next/link"

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  return (
    <div className="flex min-h-screen h-full max-h-screen">
      <aside className="w-64 h-full border-r p-4 space-y-4">
        <div className="flex items-center gap-1 border-b">
          <h2 className="font-bold text-lg">
            <Link href="/">Home</Link>
          </h2>
          <h2 className="font-semibold text-sm opacity-60">/ Admin</h2>
        </div>


        <nav className="space-y-2 flex flex-col gap-2 flex-1">
          <Link href="/admin/projects">Projects</Link>
          <Link href="/admin/profile">Profile</Link>
          <Link href="/admin/settings">Settings</Link>
        </nav>

        <button
          onClick={logout}
          className="text-sm text-red-500"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}