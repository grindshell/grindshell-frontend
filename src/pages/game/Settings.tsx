import BoolInput from "@/components/BoolInput";
import { useGameContext } from "@/lib/game-context";
import { onCleanup, ParentProps } from "solid-js";

function Settings() {
  const ctx = useGameContext();

  onCleanup(() => {
    ctx.save();
  });

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Tile>
        <BoolInput
          legend="Time tracker"
          onInput={(e) => ctx.setData("showTimeTracker", e.target.checked)}
          value={ctx.data.showTimeTracker}
          enabledText="Show time tracker"
          disabledText="Hide time tracker"
        />
      </Tile>
    </div>
  );
}

function Tile(props: ParentProps) {
  return (
    <div class="p-2 border rounded-2xl">
      {props.children}
    </div>
  );
}

export default Settings;