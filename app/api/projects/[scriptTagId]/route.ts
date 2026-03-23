import { getSupabaseAdmin } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ scriptTagId: string }> }
) {
  const { scriptTagId } = await params

  const { data: project } = await getSupabaseAdmin()
    .from("projects")
    .select("id, name, dev_port")
    .eq("script_tag_id", scriptTagId)
    .single()

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(project)
}
