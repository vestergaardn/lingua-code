import { StepNavigation } from "../continue-button"

export default function CustomizeWidgetStep() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-sm font-bold text-white">
        Customize your widget
      </h1>
      <StepNavigation
        next="/create-project/install-script"
        back="/create-project/env-vars"
      />
    </div>
  )
}
