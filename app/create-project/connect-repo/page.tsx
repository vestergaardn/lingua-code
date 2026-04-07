import { StepNavigation } from "../continue-button"

export default function ConnectRepoStep() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-sm font-bold text-white">
        Pick a repository to connect
      </h1>
      <StepNavigation next="/create-project/env-vars" />
    </div>
  )
}
