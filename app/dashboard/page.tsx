import { auth } from "@/lib/auth"
import { getSupabaseAdmin } from "@/lib/supabase"
import Link from "next/link"

export default async function Dashboard() {
  const session = await auth()
  const { data: projects } = await getSupabaseAdmin()
    .from("projects")
    .select("*")
    .eq("company_id", session!.user.companyId)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <Link
          href="/dashboard/projects/new"
          className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + New Project
        </Link>
      </div>

      {projects?.length === 0 && (
        <p className="text-zinc-400 text-sm">No projects yet. Create one to get started.</p>
      )}

      <div className="grid gap-4">
        {projects?.map((p) => (
          <Link
            key={p.id}
            href={`/dashboard/projects/${p.id}`}
            className="block bg-white border rounded-xl p-5 hover:border-zinc-400 transition-colors"
          >
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-zinc-400 mt-1">{p.repo_full_name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
