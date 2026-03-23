import { signIn } from "@/lib/auth"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Lingua Code</h1>
      <p className="text-zinc-500">Let your users improve your product.</p>
      <form
        action={async () => {
          "use server"
          await signIn("github", { redirectTo: "/dashboard" })
        }}
      >
        <button
          type="submit"
          className="bg-zinc-900 text-white px-6 py-3 rounded-lg font-medium"
        >
          Sign in with GitHub
        </button>
      </form>
    </main>
  )
}
