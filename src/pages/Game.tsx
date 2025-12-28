import Layout from "@/components/Layout";
import { HashRouter, Route } from "@solidjs/router";
import { GameProvider } from "@/lib/game-context";
import { ErrorBoundary } from "solid-js";
import GameErrorDisplay from "@/components/GameErrorDisplay";
import { Routes } from "@/routes";

function Game() {
  return (
    <ErrorBoundary fallback={GameErrorDisplay}>
      <GameProvider>
        <HashRouter root={Layout}>
          {Routes}
        </HashRouter>
      </GameProvider>
    </ErrorBoundary>
  );
}

export default Game;