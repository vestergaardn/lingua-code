import { auth } from "@/lib/auth"
import { getSupabaseAdmin } from "@/lib/supabase"
import { redirect } from "next/navigation"

export default function NewProject() {
  async function createProject(formData: FormData) {
    "use server"
    const session = await auth()
    if (!session) redirect("/")

    const repoUrl = formData.get("repo_url") as string
    const repoFullName = repoUrl.replace("https://github.com/", "").replace(/\/$/, "")

    const { data } = await getSupabaseAdmin()
      .from("projects")
      .insert({
        company_id: session.user.companyId,
        name: formData.get("name") as string,
        repo_url: repoUrl,
        repo_full_name: repoFullName,
        default_branch: (formData.get("default_branch") as string) || "main",
        install_command: (formData.get("install_command") as string) || "npm install",
        dev_command: (formData.get("dev_command") as string) || "npm run dev",
        dev_port: parseInt((formData.get("dev_port") as string) || "3000"),
      })
      .select()
      .single()

    if (data) redirect(`/dashboard/projects/${data.id}`)
  }

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">New Project</h1>
      <form action={createProject} className="space-y-4">
        <Field name="name" label="Project name" placeholder="My App" required />
        <Field name="repo_url" label="GitHub repo URL" placeholder="https://github.com/acme/my-app" required />
        <Field name="default_branch" label="Default branch" placeholder="main" />
        <Field name="install_command" label="Install command" placeholder="npm install" />
        <Field name="dev_command" label="Dev command" placeholder="npm run dev" />
        <Field name="dev_port" label="Dev port" placeholder="3000" />
        <button
          type="submit"
          className="w-full bg-zinc-900 text-white py-2.5 rounded-lg font-medium"
        >
          Create Project
        </button>
      </form>
    </div>
  )
}

function Field({ name, label, placeholder, required }: {
  name: string; label: string; placeholder: string; required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-zinc-700">{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
      />
    </div>
  )
}
