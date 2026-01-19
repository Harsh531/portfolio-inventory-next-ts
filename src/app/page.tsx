
export default async function HomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
    { cache: "no-store" }
  )

  const profile = await res.json()

  if (!res.ok) {
    console.error("Failed to fetch profile:", res.status, res.statusText)
    return <div>Error fetching profile</div>
  }

  if (!profile) {
    console.info("No profile found")
    return <div>No profile found</div>
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
}