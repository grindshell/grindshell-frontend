import { Component, For, Show } from "solid-js";

import { Separator } from "~/components/solidui/separator";
import { buttonVariants } from "~/components/solidui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/solidui/tooltip"

import { ParadoxSwitcher } from "~/components/paradox-switcher"
import { cn } from "~/lib/utils";

type SideBarItem = {
  name: string,
  label?: string,
  icon: Component,
  state: "default" | "ghost",
  isSeparator?: false
};

type SideBarSeparator = {
  isSeparator: true
};

type SideBarLink = SideBarItem | SideBarSeparator;

type GameSideBarProps = {
  isCollapsed: boolean,
  links: SideBarLink[]
};

export function GameSideBar(props: GameSideBarProps) {
  return (
    <div class="h-full flex flex-col">
      <Show
        when={props.isCollapsed}
        fallback={<ParadoxSwitcher isCollapsed={props.isCollapsed} class="p-2" />}
      >
        <div class="w-full p-1.5">
          <Tooltip openDelay={0} closeDelay={0} placement="right">
            <TooltipTrigger class="w-full">
              <ParadoxSwitcher isCollapsed={props.isCollapsed} class="w-full size-9" />
            </TooltipTrigger>
            <TooltipContent class="flex items-center gap-4">
              Paradox
            </TooltipContent>
          </Tooltip>
        </div>
      </Show>
      <Separator />
      <div
        data-collapsed={props.isCollapsed}
        class="grow group flex flex-col gap-4 p-2 overflow-y-auto"
      >
        <nav
          class="grid gap-1 group-[[data-collapsed=true]]:justify-center"
        >
          <For each={props.links}>
            {(item) => {
              return (
                <Show when={!item.isSeparator} fallback={<Separator class="my-1" />}>
                  <Show
                    when={props.isCollapsed}
                    fallback={<ExpandedItem {...item as SideBarItem} />}
                  >
                    <HiddenItem {...item as SideBarItem} />
                  </Show>
                </Show>
              )
            }}
          </For>
        </nav>
      </div>
    </div>
  )
}

function ExpandedItem(props: SideBarItem) {
  const Icon = props.icon;
  return (
    <a
      href="#"
      class={cn(
        buttonVariants({
          variant: props.state,
          size: "sm",
          class: "text-sm"
        }),
        props.state === "default" &&
        "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start"
      )}
    >
      <div class="mr-2">
        <Icon />
      </div>
      {props.name}
      {props.label && (
        <span
          class={cn(
            "ml-auto",
            props.state === "default" && "text-background dark:text-white"
          )}
        >
          {props.label}
        </span>
      )}
    </a>
  )
}

function HiddenItem(props: SideBarItem) {
  const Icon = props.icon;
  return (
    <Tooltip openDelay={0} closeDelay={0} placement="right">
      <TooltipTrigger
        class={cn(
          buttonVariants({
            variant: props.state,
            size: "icon"
          }),
          "size-9",
          props.state === "default" &&
          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
        )}
      >
        <Icon />
        <span class="sr-only">{props.name}</span>
      </TooltipTrigger>
      <TooltipContent class="flex items-center gap-4">
        {props.name}
        <Show when={props.label}>
          <span class="ml-auto text-muted-foreground">{props.label}</span>
        </Show>
      </TooltipContent>
    </Tooltip>
  )
}
