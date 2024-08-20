/* @refresh reload */
import { render } from "solid-js/web";
import "./app.css";

import { GameTopBar } from "~/components/game-top-bar";
import { GameView } from "~/components/game-view";

function Game() {
  return (
    <div class="h-screen flex flex-col">
      <GameTopBar />
      <GameView />
    </div>
  )
}

render(() => <Game />, document.getElementById("root") as HTMLElement);
