import { useNavigate } from "@solidjs/router";
import { Accessor, createEffect, createSignal, For, JSXElement, ParentProps, Setter, Show } from "solid-js";

const LAYOUT_TOGGLE = "layout-toggle";

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

const SIDEBAR_LIST = [
  {
    el: HomeIcon,
    name: "Home",
    route: "/"
  },
  {
    el: SettingsIcon,
    name: "Settings",
    route: "/settings"
  }
];

function LeftSidebar() {
  const [selected, setSelected] = createSignal("");
  const navigate = useNavigate();

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
            <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Toggle sidebar" onClick={() => toggleSidebar()}>
              <SidebarToggleIcon />
              <span class="is-drawer-close:hidden">Grindshell</span>
            </button>
          </li>
          <For each={SIDEBAR_LIST}>
            {({ el, name, route }) => <SidebarItem el={el} name={name} route={route} setter={setSelected} getter={selected} />}
          </For>
        </ul>
      </div>
    </div>
  );
}

type SidebarItemProps = {
  el: () => JSXElement,
  name: string,
  route: string,
  setter: Setter<string>,
  getter: Accessor<string>;
};

function SidebarItem(props: SidebarItemProps) {
  return (
    <li>
      <button
        class={"is-drawer-close:tooltip is-drawer-close:tooltip-right" + (props.getter() === props.route ? " font-semibold bg-base-100" : "")}
        data-tip={props.name}
        onClick={() => props.setter(props.route)}
      >
        <props.el />
        <Show when={props.getter() === props.route}>
          <span class="absolute inset-y-0 left-0 w-1 rounded-br-md bg-primary" aria-hidden></span>
        </Show>
        <span class="is-drawer-close:hidden">{props.name}</span>
      </button>
    </li>
  );
}

function Content(props: ParentProps) {
  return (
    <div class="drawer-content">
      <nav class="navbar w-full bg-base-300">
        <div class="px-4">Navbar Title TODO</div>
      </nav>
      <div class="p-4">{props.children}</div>
    </div>
  );
}

/**
 * From https://daisyui.com/components/drawer/
 */
function SidebarToggleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4">
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
      <path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path>
    </svg>
  );
}

/**
 * From https://daisyui.com/components/drawer/
 */
function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    </svg>
  );
}

/**
 * From https://daisyui.com/components/drawer/
 */
function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4">
      <path d="M20 7h-9"></path>
      <path d="M14 17H5"></path>
      <circle cx="17" cy="17" r="3"></circle>
      <circle cx="7" cy="7" r="3"></circle>
    </svg>
  );
}

export default Layout;