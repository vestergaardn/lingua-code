import { Sandbox } from "@e2b/code-interpreter"
import { getSupabaseAdmin } from "@/lib/supabase"
import { NextResponse } from "next/server"

export const maxDuration = 120

export async function POST(req: Request) {
  const { scriptTagId } = await req.json()

  const { data: project } = await getSupabaseAdmin()
    .from("projects")
    .select("*, companies(github_token)")
    .eq("script_tag_id", scriptTagId)
    .single()

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const githubToken = (project.companies as any).github_token
  const repoUrl = `https://oauth2:${githubToken}@github.com/${project.repo_full_name}.git`

  const sandbox = await Sandbox.create({
    timeoutMs: 60 * 60 * 1000,
  })

  await sandbox.commands.run(`git clone ${repoUrl} /app`)
  await sandbox.commands.run(project.install_command, { cwd: "/app" })

  const viteConfig = `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: ${project.dev_port},
    strictPort: true,
    hmr: false,
    allowedHosts: ['.e2b.app', '.e2b.dev'],
  },
})
`.trim()

  await sandbox.files.write("/app/vite.config.js", viteConfig)

  sandbox.commands.run(project.dev_command, { cwd: "/app", background: true })

  await new Promise((r) => setTimeout(r, 4000))

  const previewUrl = `https://${sandbox.getHost(project.dev_port)}`

  return NextResponse.json({
    sandboxId: sandbox.sandboxId,
    previewUrl,
  })
}
