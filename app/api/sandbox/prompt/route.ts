import { Sandbox } from "@e2b/code-interpreter"
import Anthropic from "@anthropic-ai/sdk"
import { corsResponse, corsOptions } from "@/lib/cors"
import { INTROSPECT_CMD, parseIntrospection, discoverSourceFiles, buildSystemPrompt } from "@/lib/sandbox-introspect"

export const maxDuration = 60

export function OPTIONS() { return corsOptions() }

const anthropic = new Anthropic()

export async function POST(req: Request) {
  try {
    const { sandboxId, prompt } = await req.json()

    const sandbox = await Sandbox.connect(sandboxId)

    // Discover project structure and read source files dynamically
    const introspectResult = await sandbox.commands.run(INTROSPECT_CMD, { timeoutMs: 10_000 })
    const projectInfo = parseIntrospection(introspectResult.stdout)
    const files = await discoverSourceFiles(sandbox)
    const filePaths = Object.keys(files)

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 8192,
      system: buildSystemPrompt(projectInfo, filePaths),
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
      return corsResponse({ error: "LLM returned invalid response" }, { status: 500 })
    }

    for (const file of changedFiles) {
      await sandbox.files.write(`/home/user/app/${file.path}`, file.content)
    }

    return corsResponse({
      success: true,
      changedFiles: changedFiles.map((f) => f.path),
    })
  } catch (error) {
    console.error("[sandbox/prompt] Error:", error)
    return corsResponse(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
