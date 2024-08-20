import { EnergyHeader } from "~/components/energy-header";
import { UserNav } from "~/components/user-nav";

type GameTopBarProps = {

};

export function GameTopBar(props: GameTopBarProps) {
  return (
    <div class="flex flex-col">
      <div class="border-b">
        <div class="flex h-16 items-center px-2 sm:px-4">
          <EnergyHeader class="mr-2 hover:outline hover:rounded" />
          <UserNav class="sm:ml-auto flex items-center space-x-4" />
        </div>
      </div>
    </div>
  );
}