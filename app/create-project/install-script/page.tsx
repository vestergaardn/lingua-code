import { StepNavigation } from "../continue-button"

export default function InstallScriptStep() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-sm font-bold text-white">
        Insert the script tag
      </h1>
      <StepNavigation
        next="/dashboard"
        back="/create-project/customize-widget"
      />
    </div>
  )
}
