import { ComponentProps, createSignal } from "solid-js"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/solidui/select";
import { cn } from "~/lib/utils";
import { Paradox } from "~/model/paradox";

type ParadoxSwitcherProps = ComponentProps<"div"> & {
  isCollapsed: boolean
};

export function ParadoxSwitcher(props: ParadoxSwitcherProps) {
  // TODO pull from context
  const paradoxes: Paradox[] = [
    {
      id: 0,
      name: "Normal"
    },
    {
      id: 1,
      name: "Test"
    }
  ];

  const [selectedParadox, setSelectedParadox] = createSignal(paradoxes[0])

  return (
    <Select
      value={selectedParadox()}
      onChange={setSelectedParadox}
      options={paradoxes}
      optionValue="id"
      optionTextValue="name"
      placement="bottom-start"
      disallowEmptySelection
      itemComponent={(props) => (
        <SelectItem item={props.item}>
          <div class="flex flex-row items-center gap-3">
            {props.item.rawValue.id} {props.item.rawValue.name}
          </div>
        </SelectItem>
      )}
      class={props.class}
    >
      <SelectTrigger
        class={cn("flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:size-4 [&_svg]:shrink-0",
          props.isCollapsed &&
          "flex size-9 shrink-0 items-center justify-center p-0 w-full [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="select paradox"
      >
        <SelectValue<Paradox>>
          {(state) => (
            <>
              {state.selectedOption().id}
              <div class={cn("ml-2", props.isCollapsed && "hidden")}>
                {state.selectedOption().name}
              </div>
            </>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  )
}