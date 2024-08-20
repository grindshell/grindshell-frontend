import { ComponentProps, splitProps } from "solid-js";

import { cn } from "~/lib/utils";
import { Progress, ProgressLabel, ProgressValueLabel } from "./solidui/progress";

type EnergyHeaderProps = ComponentProps<"div"> & {

};

export function EnergyHeader(props: ComponentProps<"div">) {
  const [_, rest] = splitProps(props, ["class"]);

  return (
    <div class="flex grow h-16 items-center">
      <div class={cn("grow items-center sm:p-2", props.class)} {...rest}>
        <Progress
          value={3}
          minValue={0}
          maxValue={10}
          getValueLabel={({ value, max }) => `${value} of ${max} tasks completed`}
          class="w-full space-y-1"
        >
          <div class="hidden sm:flex justify-between">
            <ProgressLabel>Processing...</ProgressLabel>
            <ProgressValueLabel />
          </div>
        </Progress>
      </div>
    </div>
  )
}