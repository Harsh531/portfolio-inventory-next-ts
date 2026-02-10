import { Badge } from "@/components/ui/badge";
import { getBaseUrl } from "@/lib/config";

export default async function ProjectsPage() {
  const baseUrl = getBaseUrl()

  try {
    const settingsRes = await fetch(
      `${baseUrl}/api/settings`,
      { cache: "no-store" }
    )

    if (!settingsRes.ok) {
      console.error("Failed to fetch settings:", settingsRes.status)
      return <p className="p-6">Portfolio is private.</p>
    }

    const settings = await settingsRes.json()

    if (!settings?.portfolioVisible) {
      return <p className="p-6">Portfolio is private.</p>
    }

    const res = await fetch(
      `${baseUrl}/api/projects`,
      { cache: "no-store" }
    )

    if (!res.ok) {
      console.error("Failed to fetch projects:", res.status)
      return <p className="p-6">Error loading projects</p>
    }

    const projects = await res.json();

    console.log(projects, "projects")

    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Projects</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p: any) => (
            <div key={p._id} className="border p-4 rounded">
              <h2 className="font-semibold">{p.title}</h2>
              <p>{p.description}</p>
              {
                  p.techStack.map((s: string) => (
                      <Badge key={s} variant={"outline"}>{s}</Badge>
                  ))
              }
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading page:", error)
    return <p className="p-6">Error loading projects page</p>
  }
}