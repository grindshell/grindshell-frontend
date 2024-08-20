import { ComponentProps, splitProps } from "solid-js";
import { Button } from "./solidui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./solidui/dropdown-menu";

export function UserNav(props: ComponentProps<"div">) {
  const [_, rest] = splitProps(props, ["class"]);

  const toIndex = () => {
    window.location.assign("index");
  }

  return (
    <div class={props.class} {...rest}>
      <DropdownMenu placement="bottom-end">
        <DropdownMenuTrigger
          as={Button<"button">}
          variant="outline"
          class="relative size-8 rounded-full w-fit"
        >
          <div>Username goes here</div>
        </DropdownMenuTrigger>

        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel class="font-normal">
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">youwin</p>
              <p class="text-xs leading-none text-muted-foreground">you@youwin</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={toIndex}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}