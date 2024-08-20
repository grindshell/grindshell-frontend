import { createSignal } from "solid-js";

import { cookieStorage, makePersisted } from "@solid-primitives/storage";

import { Resizable, ResizableHandle, ResizablePanel } from "~/components/solidui/resizable";
import { Separator } from "~/components/solidui/separator";
import { IconInbox } from "~/components/solidui/icons";
import { cn } from "~/lib/utils";

import { ParadoxSwitcher } from "~/components/paradox-switcher";
import { ChatBox } from "~/components/chat-box";
import { GameSideBar } from "~/components/game-side-bar";

type GameViewProps = {

};

export function GameView(props: GameViewProps) {
  const [sizes, setSizes] = makePersisted(createSignal<number[]>([]), {
    name: "game-view-sizes",
    storage: cookieStorage
  });

  const [isCollapsed, setIsCollapsed] = createSignal(false);

  return (
    <Resizable sizes={sizes()} onSizesChange={setSizes}>
      <ResizablePanel
        initialSize={sizes()[0] ?? 0.2}
        minSize={0.1}
        maxSize={0.2}
        collapsible
        onCollapse={(e) => {
          setIsCollapsed(e === 0);
        }}
        onExpand={() => {
          setIsCollapsed(false);
        }}
        class={cn(isCollapsed() && "min-w-[50px] transition-all duration-300 ease-in-out")}
      >
        {/* <ParadoxSwitcher isCollapsed={isCollapsed()} />
        <Separator /> */}
        <GameSideBar
          isCollapsed={isCollapsed()}
          links={[
            {
              name: "Home",
              icon: IconInbox,
              state: "default"
            },
            {
              isSeparator: true
            },
            {
              name: "Long name for realz",
              icon: IconInbox,
              state: "ghost"
            }
          ]}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel
        initialSize={sizes()[1] ?? 0.4}
        minSize={0.3}
      >
        <Resizable orientation="vertical">
          <ResizablePanel minSize={0.3}>

          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel initialSize={sizes()[2] ?? 0.4} minSize={0.3} class="overflow-y-auto">
            <ChatBox />
          </ResizablePanel>
        </Resizable>
      </ResizablePanel>
    </Resizable>
  )
}