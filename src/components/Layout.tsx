import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal, For, JSX, JSXElement, onCleanup, ParentProps, Setter, Show } from "solid-js";
import TopBar from "./TopBar";
import { useGameContext } from "@/lib/game-context";
import * as Icons from "@/components/Icons";
import { RoutePath } from "@/routes";
import GlobalChat from "@/pages/game/GlobalChat";
import Resizable from "@corvu/resizable";

export const LAYOUT_TOGGLE = "layout-toggle";

function Layout(props: ParentProps) {
  return (
    <div class="drawer lg:drawer-open">
      <input id={LAYOUT_TOGGLE} type="checkbox" class="drawer-toggle" />
      <Content>
        {props.children}
      </Content>
      <LeftSidebar />
    </div>
  );
}

type SidebarListItem = {
  el: () => JSX.Element,
  name: string,
  route: RoutePath,
};

const GAME_PAGE_LIST: SidebarListItem[] = [
  {
    el: Icons.ViewfinderCircle,
    name: "Overview",
    route: "/"
  },
  {
    el: Icons.MapPin,
    name: "Actions",
    route: "/actions"
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
  },
  {
    el: Icons.NumberedList,
    name: "Rankings",
    route: "/rankings"
  }
];

const BOTTOM_PAGE_LIST: SidebarListItem[] = [
  {
    el: Icons.AdjustmentsHorizontal,
    name: "Settings",
    route: "/settings"
  },
  {
    el: Icons.QuestionMarkCircle,
    name: "About",
    route: "/about"
  }
];

function LeftSidebar() {
  const ctx = useGameContext();
  const [selected, setSelected] = createSignal<RoutePath>(ctx.data.currentRoute);
  const navigate = useNavigate();

  createEffect(() => {
    ctx.setData("currentRoute", selected());
    ctx.save();
    navigate(ctx.data.currentRoute, { replace: true });
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
          <SidebarGroup list={GAME_PAGE_LIST} setter={setSelected} current_route={selected()} />
          <Divider />
          <SidebarGroup list={UTIL_PAGE_LIST} setter={setSelected} current_route={selected()} />
          <Show when={ctx.data.showTimeTracker}>
            <SidebarItem
              el={Icons.TableCells}
              name="Time Tracker"
              route="/time-tracker"
              onClick={() => setSelected("/time-tracker")}
              isSelected={selected() === "/time-tracker"}
            />
          </Show>
          <Show when={ctx.data.showResourceEditor}>
            <SidebarItem
              el={Icons.ClipboardDocumentList}
              name="Resource Editor"
              route="/resource-editor"
              onClick={() => setSelected("/resource-editor")}
              isSelected={selected() === "/resource-editor"}
            />
          </Show>
          <div class="flex grow h-full"></div>
          <Divider />
          <SidebarGroup list={BOTTOM_PAGE_LIST} setter={setSelected} current_route={selected()} />
        </ul>
      </div>
    </div>
  );
}

type SidebarGroupProps = {
  list: SidebarListItem[],
  setter: Setter<RoutePath>,
  current_route: string;
};

function SidebarGroup(props: SidebarGroupProps) {
  return (
    <For each={props.list}>
      {({ el, name, route }) =>
        <SidebarItem
          el={el}
          name={name}
          route={route}
          onClick={() => props.setter(route)}
          isSelected={props.current_route === route}
        />
      }
    </For>
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
  route: RoutePath,
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
  const CONTENT_SIZE = 0.7;

  return (
    <div class="h-screen drawer-content flex flex-col">
      <TopBar />
      <Resizable class="size-full overflow-hidden" orientation="vertical">
        <Resizable.Panel class="overflow-auto" initialSize={CONTENT_SIZE} minSize={0.1}>
          <div class="p-4 size-full">{props.children}</div>
        </Resizable.Panel>

        <Resizable.Handle class="h-0.5">
          <div class="bg-base-content hover:bg-accent size-full"></div>
        </Resizable.Handle>

        <Resizable.Panel initialSize={1.0 - CONTENT_SIZE}>
          <GlobalChat />
        </Resizable.Panel>
      </Resizable>
    </div>
  );
}

export default Layout;