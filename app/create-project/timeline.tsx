"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Check, Loader2 } from "lucide-react"

const steps = [
  { label: "Connect repo", path: "/create-project/connect-repo" },
  { label: "Insert .env vars", path: "/create-project/env-vars" },
  { label: "Customize widget", path: "/create-project/customize-widget" },
  { label: "Insert script tag", path: "/create-project/install-script" },
]

type StepState = "done" | "loading" | "not-done"

function getStepStates(pathname: string): StepState[] {
  const currentIndex = steps.findIndex((s) => pathname.startsWith(s.path))
  return steps.map((_, i) => {
    if (i < currentIndex) return "done"
    if (i === currentIndex) return "loading"
    return "not-done"
  })
}

function StepIcon({ state, index }: { state: StepState; index: number }) {
  if (state === "done") {
    return (
      <div className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-green-500">
        <Check size={10} strokeWidth={3} className="text-white" />
      </div>
    )
  }
  if (state === "loading") {
    return (
      <div className="flex size-[18px] shrink-0 items-center justify-center">
        <Loader2
          size={18}
          className="animate-spin text-white/60"
          strokeWidth={2}
        />
      </div>
    )
  }
  return (
    <div className="flex size-[18px] shrink-0 items-center justify-center rounded-full border border-white/30">
      <span className="text-[9px] font-medium text-white/60">{index + 1}</span>
    </div>
  )
}

export function Timeline() {
  const pathname = usePathname()
  const states = getStepStates(pathname)

  return (
    <div className="flex flex-col gap-0">
      <p className="mb-3 text-xs font-light text-white/70">Account Setup</p>
      {steps.map((step, i) => (
        <div key={step.path} className="flex flex-col items-start">
          <Link
            href={step.path}
            className="flex items-center gap-3 group"
          >
            <StepIcon state={states[i]} index={i} />
            <span
              className={`text-xs leading-none group-hover:text-white ${
                states[i] === "loading"
                  ? "font-medium text-white"
                  : states[i] === "done"
                    ? "text-white"
                    : "text-white/50"
              }`}
            >
              {step.label}
            </span>
          </Link>
          {i < steps.length - 1 && (
            <div className="ml-[8.5px] h-[14px] w-px bg-white/20" />
          )}
        </div>
      ))}
    </div>
  )
}
