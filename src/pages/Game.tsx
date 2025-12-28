import Layout from "@/components/Layout";
import { HashRouter, Route } from "@solidjs/router";
import Overview from "./game/Home";
import Settings from "./game/Settings";
import { GameProvider } from "@/lib/game-context";
import { ErrorBoundary } from "solid-js";
import GameErrorDisplay from "@/components/GameErrorDisplay";
import GlobalMarket from "./game/GlobalMarket";
import Area from "./game/Area";
import Formation from "./game/Formation";
import TimeTracker from "./game/TimeTracker";
import Profile from "./game/Profile";

function Game() {
  return (
    <ErrorBoundary fallback={GameErrorDisplay}>
      <GameProvider>
        <HashRouter root={Layout}>
          <Route path="/" component={Overview} />
          <Route path="/area" component={Area} />
          <Route path="/formation" component={Formation} />
          <Route path="/global-market" component={GlobalMarket} />
          <Route path="/profile" component={Profile} />
          <Route path="/time-tracker" component={TimeTracker} />
          <Route path="/settings" component={Settings} />
        </HashRouter>
      </GameProvider>
    </ErrorBoundary>
  );
}

export default Game;