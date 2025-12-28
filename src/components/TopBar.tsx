import { useGameContext } from "@/lib/game-context";
import { createSignal } from "solid-js";
import { LAYOUT_TOGGLE } from "./Layout";
import * as Icons from "@/components/Icons";

function TopBar() {
  const ctx = useGameContext();

  // TODO stub, needs to listen for tick start events from ws
  const [progress, setProgress] = createSignal(0);

  return (
    <nav class="navbar w-full bg-base-300">
      <div class="px-4 w-full flex flex-row">
        <label for={LAYOUT_TOGGLE} aria-label="toggle sidebar" class="btn btn-square btn-ghost mr-2 lg:hidden">
          <Icons.CodeBracketSquare />
        </label>
        <div class="w-full my-auto">
          <progress class="progress w-full" max="100" value={progress()}></progress>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;