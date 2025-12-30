import BoolInput from "@/components/BoolInput";
import SelectInput from "@/components/SelectInput";
import { Data, THEMES, useGameContext } from "@/lib/game-context";
import { createEffect, createSignal, For, onCleanup, ParentProps } from "solid-js";
import { createStore, Part } from "solid-js/store";

function Settings() {
  const ctx = useGameContext();

  // Work off of local copy of data
  const [wipData, setWIPData] = createStore(Data.clone(ctx.data));
  // Track which specific settings was changed
  const [lastChange, setLastChange] = createSignal<string | undefined>();
  // List of settings that are different from the context's data
  // Allows for granular updates when applying/reverting settings
  const [settingsChanged, setSettingsChanged] = createStore<string[]>([]);
  const [applyRevertEnabled, setApplyRevertEnabled] = createSignal(false);

  createEffect(() => {
    let name = lastChange();
    if (name) {
      // @ts-ignore guaranteed to be valid when using factory function to create callback
      if (wipData[name] !== ctx.data[name]) {
        setSettingsChanged((existing) => [...existing, name]);
      } else {
        setSettingsChanged(settingsChanged.filter((n) => n !== name));
      }
    }

    setApplyRevertEnabled(settingsChanged.length !== 0);
  });

  const setTheme = (theme?: string) => {
    document.querySelector("html")!.setAttribute("data-theme", theme ?? ctx.data.theme);
  };

  onCleanup(() => {
    setTheme();
  });

  /**
   * Reset signals and stores that track changes.
   */
  const resetSettingsChanged = () => {
    setApplyRevertEnabled(false);
    setLastChange(undefined);
    setSettingsChanged([]);
    setTheme();
  };

  /**
   * Different fields that should be accessed from an HTMLInputElement.
   */
  type EventKey = "value" | "checked";
  /**
   * Factory function for creating callbacks that modify WIP data.
   */
  const inputCallback = (
    name: Part<Data, keyof Data>,
    val: EventKey,
    extraFunc?: (e: Event & { target: HTMLElement, currentTarget: HTMLElement; }) => void
  ) => {
    return (e: Event & { target: HTMLElement, currentTarget: HTMLElement; }) => {
      if (extraFunc) {
        extraFunc(e);
      }
      setLastChange(name as string);
      // @ts-ignore the event keys are correct
      setWIPData(name, e.target[val]);
    };
  };

  return (
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-2">
        <button
          classList={{
            "btn": true,
            "btn-disabled": !applyRevertEnabled(),
            "btn-primary": applyRevertEnabled()
          }}
          onClick={() => {
            for (const name of settingsChanged) {
              // @ts-ignore wipData is a clone of ctx.data
              ctx.setData(name, wipData[name]);
            }
            ctx.save();
            resetSettingsChanged();
          }}
        >
          Save
        </button>
        <button
          classList={{
            "btn": true,
            "btn-disabled": !applyRevertEnabled(),
            "btn-error": applyRevertEnabled()
          }}
          onClick={() => {
            for (const name of settingsChanged) {
              // @ts-ignore setting data back to initial data
              setWIPData(name, ctx.data[name]);
            }
            resetSettingsChanged();
          }}
        >
          Revert
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Tile>
          <SelectInput
            legend="Theme"
            options={THEMES.sort()}
            initialValue={wipData.theme}
            onInput={inputCallback("theme", "value", (e) => {
              // @ts-ignore this definitely exists
              setTheme(e.target.value);
            })}
            label={wipData.theme !== ctx.data.theme ? "Live preview!" : undefined}
          />
        </Tile>
        <Tile>
          <BoolInput
            legend="Time tracker"
            onInput={inputCallback("showTimeTracker", "checked")}
            value={wipData.showTimeTracker}
            enabledText="Show time tracker"
            disabledText="Hide time tracker"
          />
        </Tile>
        <Tile>
          <BoolInput
            legend="Resource editor"
            onInput={inputCallback("showResourceEditor", "checked")}
            value={wipData.showResourceEditor}
            enabledText="Show resource editor"
            disabledText="Hide resource editor"
          />
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
        <Tile>
          <div class="h-20"></div>
        </Tile>
      </div>
    </div>
  );
}

function Tile(props: ParentProps) {
  return (
    <div class="p-2 border rounded-xl bg-base-200">
      {props.children}
    </div>
  );
}

export default Settings;