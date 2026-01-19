import { Badge } from "@/components/ui/badge";

export default async function ProjectsPage() {
  const settingsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`,
    { cache: "no-store" }
  )

  const settings = await settingsRes.json()

  if (!settings?.portfolioVisible) {
    return <p className="p-6">Portfolio is private.</p>
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
    { cache: "no-store" }
  )

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
}