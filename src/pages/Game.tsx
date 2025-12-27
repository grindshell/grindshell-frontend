import Layout from "@/components/Layout";
import { HashRouter, Route } from "@solidjs/router";
import Overview from "./game/Home";
import Settings from "./game/Settings";

function Game() {
  return (
    <HashRouter>
      <Route path="/" component={Layout} >
        <Route path="/" component={Overview} />
        <Route path="/settings" component={Settings} />
      </Route>
    </HashRouter>
  );
}

export default Game;