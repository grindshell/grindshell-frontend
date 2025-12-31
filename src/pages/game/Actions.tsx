import { ACTIONS, useGameContext } from "@/lib/game-context";
import { createMemo, createSignal, For, Match, Switch } from "solid-js";

function Actions() {
  const ctx = useGameContext();
  const [input, setInput] = createSignal("");
  const hasInput = createMemo(() => input().length > 0);

  return (
    <div class="size-full grid lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 flex flex-col">
        <Switch >
          <Match when={ctx.data.currentAction === "Idle"}>
            <Idle />
          </Match>
        </Switch>
      </div>
      <div class="size-full flex flex-col gap-2">
        <ul class="grow border rounded overflow-y-scroll p-2">
          <li>test</li>
        </ul>
        <div class="flex flex-row gap-2">
          <input
            type="text"
            placeholder="Send an action command."
            class="input grow"
            onInput={(e) => setInput(e.target.value)}
          />
          <button
            classList={{
              "btn": true,
              "btn-accent": hasInput(),
              "btn-disabled": !hasInput()
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Show an action selector.
 */
function Idle() {
  return (
    <div class="m-auto lg:p-20 lg:border flex flex-col gap-2 lg:grid lg:grid-rows-2">
      <p class="text-center">You are currently idle.</p>
      <div class="flex flex-row gap-2">
        <For each={ACTIONS.filter((v) => v !== "Idle" && v !== "Follow")}>
          {(v) =>
            <button class="btn btn-soft hover:btn-success">{v}</button>
          }
        </For>
      </div>
    </div>
  );
}

export default Actions;