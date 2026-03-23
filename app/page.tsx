import Image from "next/image"
import { auth, signIn } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  if (session) redirect("/dashboard")

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-medium text-3xl font-bold leading-10">
          Introducing
        </span>
        <Image src="/Group 1.svg" alt="Tweaky" width={122} height={37} />
      </div>

      <h1 className="max-w-[730px] text-center text-black text-6xl font-bold leading-tight">
        Let users improve your application with zero access to code.
      </h1>

      <form
        action={async () => {
          "use server"
          await signIn("github")
        }}
        className="mt-12"
      >
        <button
          type="submit"
          className="gradient-btn px-10 py-4 text-white text-xl font-normal rounded-[500px]"
        >
          Connect repo
        </button>
      </form>
    </div>
  )
}
