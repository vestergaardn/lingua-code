import { Sandbox } from "@e2b/code-interpreter"
import Anthropic from "@anthropic-ai/sdk"
import { NextResponse } from "next/server"

export const maxDuration = 60

const anthropic = new Anthropic()

export async function POST(req: Request) {
  const { sandboxId, prompt } = await req.json()

  const sandbox = await Sandbox.connect(sandboxId)
  const files = await readSourceFiles(sandbox, "/app/src")

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 8192,
    system: `You are a code editor for a React application.
You receive the full source code and a user request.
Make only the changes needed to fulfil the request.

RULES:
- Respond with ONLY a JSON object. No explanation. No markdown fences.
- The JSON must have a "files" key: an array of {path, content} objects.
- Only include files that need to change.
- Paths are relative to /app (e.g. "src/components/Navbar.tsx").
- Preserve all existing functionality unrelated to the request.

Example:
{"files": [{"path": "src/components/Navbar.tsx", "content": "...full content..."}]}`,
    messages: [{
      role: "user",
      content: `Source code:\n\n${JSON.stringify(files, null, 2)}\n\nRequest: ${prompt}`,
    }],
  })

  const text = message.content[0].type === "text" ? message.content[0].text : ""

  let changedFiles: { path: string; content: string }[] = []
  try {
    changedFiles = JSON.parse(text).files ?? []
  } catch {
    return NextResponse.json({ error: "LLM returned invalid response" }, { status: 500 })
  }

  for (const file of changedFiles) {
    await sandbox.files.write(`/app/${file.path}`, file.content)
  }

  return NextResponse.json({
    success: true,
    changedFiles: changedFiles.map((f) => f.path),
  })
}

async function readSourceFiles(
  sandbox: Sandbox,
  dirPath: string
): Promise<Record<string, string>> {
  const result: Record<string, string> = {}
  try {
    const entries = await sandbox.files.list(dirPath)
    for (const entry of entries) {
      const fullPath = `${dirPath}/${entry.name}`
      if (entry.type === "dir") {
        Object.assign(result, await readSourceFiles(sandbox, fullPath))
      } else if (/\.(tsx?|jsx?|css|json)$/.test(entry.name)) {
        result[fullPath.replace("/app/", "")] = await sandbox.files.read(fullPath)
      }
    }
  } catch {
    // Directory may not exist — skip silently
  }
  return result
}
