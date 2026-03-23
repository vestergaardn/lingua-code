import { getSupabaseAdmin } from "@/lib/supabase"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()
  const { data: project } = await getSupabaseAdmin()
    .from("projects")
    .select("*, submissions(*)")
    .eq("id", id)
    .eq("company_id", session!.user.companyId)
    .single()

  if (!project) redirect("/dashboard")

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ""
  const scriptTag = `<script src="${appUrl}/widget.js" data-project-id="${project.script_tag_id}"></script>`

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-zinc-400 text-sm mt-1">{project.repo_full_name}</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Add to your site</h2>
        <p className="text-sm text-zinc-500">Paste this before the closing &lt;/body&gt; tag:</p>
        <pre className="bg-zinc-900 text-zinc-100 text-sm p-4 rounded-xl overflow-x-auto">
          {scriptTag}
        </pre>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold">Submissions</h2>
        {project.submissions?.length === 0 && (
          <p className="text-sm text-zinc-400">No submissions yet.</p>
        )}
        {project.submissions?.map((s: any) => (
          <div key={s.id} className="border rounded-xl p-4 space-y-1">
            <div className="text-sm font-medium">{s.user_prompt}</div>
            <div className="text-xs text-zinc-400">
              {s.user_email} · {s.bounty_amount} points · {s.status}
            </div>
            {s.pr_url && (
              <a href={s.pr_url} target="_blank" className="text-xs text-blue-600 hover:underline">
                View PR &rarr;
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
