import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal, For, JSX, JSXElement, ParentProps, Show } from "solid-js";
import TopBar from "./TopBar";
import { useGameContext } from "@/lib/game-context";
import * as Icons from "@/components/Icons";
import { RoutePath } from "@/routes";

export const LAYOUT_TOGGLE = "layout-toggle";

function Layout(props: ParentProps) {
  return (
    <>
      <div class="drawer lg:drawer-open">
        <input id={LAYOUT_TOGGLE} type="checkbox" class="drawer-toggle" />
        <Content>
          {props.children}
        </Content>
        <LeftSidebar />
      </div>
    </>
  );
}

type SidebarListItem = {
  el: () => JSX.Element,
  name: string,
  route: RoutePath,
};

const GAME_PAGE_LIST: SidebarListItem[] = [
  {
    el: Icons.Home,
    name: "Home",
    route: "/"
  },
  {
    el: Icons.Map,
    name: "Area",
    route: "/area"
  },
  {
    el: Icons.Users,
    name: "Formation",
    route: "/formation"
  },
  {
    el: Icons.Scale,
    name: "Global Market",
    route: "/global-market"
  }
];

const UTIL_PAGE_LIST: SidebarListItem[] = [
  {
    el: Icons.Identification,
    name: "Profile",
    route: "/profile"
  }
];

function LeftSidebar() {
  const [selected, setSelected] = createSignal<RoutePath>("/");
  const navigate = useNavigate();
  const ctx = useGameContext();

  createEffect(() => {
    navigate(selected(), { replace: true });
  });

  function toggleSidebar() {
    document.getElementById(LAYOUT_TOGGLE)?.click();
  }

  return (
    <div class="drawer-side is-drawer-close:overflow-visible">
      <label for={LAYOUT_TOGGLE} aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="min-h-full flex flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
        <ul class="menu w-full grow">
          <li>
            <button
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Toggle sidebar"
              onClick={() => toggleSidebar()}
            >
              <Icons.CodeBracketSquare />
              <span class="is-drawer-close:hidden text-sm">Grindshell</span>
            </button>
          </li>
          <Divider />
          <For each={GAME_PAGE_LIST}>
            {({ el, name, route }) =>
              <SidebarItem
                el={el}
                name={name}
                route={route}
                onClick={() => setSelected(route)}
                isSelected={selected() === route}
              />
            }
          </For>
          <Divider />
          <For each={UTIL_PAGE_LIST}>
            {({ el, name, route }) =>
              <SidebarItem
                el={el}
                name={name}
                route={route}
                onClick={() => setSelected(route)}
                isSelected={selected() === route}
              />
            }
          </For>
          <Show when={ctx.data.showTimeTracker}>
            <SidebarItem
              el={Icons.TableCells}
              name="Time Tracker"
              route="/time-tracker"
              onClick={() => setSelected("/time-tracker")}
              isSelected={selected() === "/time-tracker"}
            />
          </Show>
          <div class="flex grow h-full"></div>
          <Divider />
          <SidebarItem
            el={Icons.AdjustmentsHorizontal}
            name="Settings"
            route="/settings"
            onClick={() => setSelected("/settings")}
            isSelected={selected() === "/settings"}
          >

          </SidebarItem>
        </ul>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div class="divider my-0"></div>
  );
}

type SidebarItemProps = {
  el: () => JSXElement,
  name: string,
  route: string,
  onClick: () => void,
  isSelected: boolean;
};

function SidebarItem(props: SidebarItemProps) {
  return (
    <li>
      <button
        classList={{
          "is-drawer-close:tooltip": true,
          "is-drawer-close:tooltip-right": true,
          "font-semibold": props.isSelected,
          "bg-base-100": props.isSelected
        }}
        data-tip={props.name}
        onClick={props.onClick}
      >
        <props.el />
        <Show when={props.isSelected}>
          <span class="absolute inset-y-0 left-0 w-1 rounded-br-md bg-primary" aria-hidden></span>
        </Show>
        <span class="is-drawer-close:hidden text-sm truncate">{props.name}</span>
      </button>
    </li>
  );
}

function Content(props: ParentProps) {
  return (
    <div class="drawer-content">
      <TopBar />
      <div class="p-4">{props.children}</div>
    </div>
  );
}

export default Layout;