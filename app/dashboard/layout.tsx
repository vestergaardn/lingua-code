import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect("/")
  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <span className="font-semibold">Lingua Code</span>
        <span className="text-sm text-zinc-500">{session.user.githubLogin}</span>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
    </div>
  )
}
