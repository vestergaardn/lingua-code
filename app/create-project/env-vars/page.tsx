import { StepNavigation } from "../continue-button"

export default function EnvVarsStep() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-sm font-bold text-white">
        Insert your environment variables
      </h1>
      <StepNavigation
        next="/create-project/customize-widget"
        back="/create-project/connect-repo"
      />
    </div>
  )
}
