"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useApi } from "@/lib/useApi"

export default function SettingsPage() {
  const { getApiUrl } = useApi()
  const [settings, setSettings] = useState({
    theme: "system",
    portfolioVisible: true
  })

  useEffect(() => {
    fetch(getApiUrl("/api/settings"))
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch settings: ${res.status}`)
        }
        return res.json()
      })
      .then(data => data && setSettings(data))
      .catch(error => console.error("Error fetching settings:", error))
  }, [getApiUrl])

  async function save() {
    try {
      const res = await fetch(getApiUrl("/api/settings"), {
        method: "POST",
        body: JSON.stringify(settings)
      })
      if (!res.ok) {
        const errorData: any = await res.json()
        const errorMessage = errorData.message || "Failed to save settings"
        throw new Error(errorMessage)
      }
      alert("Settings saved")
    } catch (error) {
      console.error("Failed to save settings:", error)
      alert("Failed to save settings")
    }
  }

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="flex items-center justify-between">
        <span>Portfolio Visible</span>
        <Switch
          checked={settings.portfolioVisible}
          onCheckedChange={v =>
            setSettings({ ...settings, portfolioVisible: v })
          }
        />
      </div>

      <Button onClick={save}>Save</Button>
    </div>
  )
}