
import { getBaseUrl } from "@/lib/config";

export default async function HomePage() {
  const baseUrl = getBaseUrl()

  try {
    const res = await fetch(
      `${baseUrl}/api/profile`,
      { cache: "no-store" }
    )

    if (!res.ok) {
      // console.error("Failed to fetch profile:", res.status, res.statusText)
      return <div className="max-w-4xl mx-auto p-6 space-y-6">Error fetching profile {JSON.stringify(res, null, 2)}</div>
    }

    const profile = await res.json()

    if (!profile) {
      console.info("No profile found")
      return <div className="max-w-4xl mx-auto p-6 space-y-6">No profile found</div>
    }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold">{profile?.name}</h1>
      <h2 className="text-xl text-muted-foreground">
        {profile?.title}
      </h2>

      <p>{profile?.bio}</p>

      <div className="flex gap-2 flex-wrap">
        {profile?.skills?.map((skill: string) => (
          <span
            key={skill}
            className="border px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {profile?.resumeUrl && (
        <a
          href={profile.resumeUrl}
          target="_blank"
          className="underline"
        >
          Download Resume
        </a>
      )}
    </main>
    )
  } catch (error) {
    console.error("Error loading profile:", error)
    return <div>Error loading profile</div>
  }
}