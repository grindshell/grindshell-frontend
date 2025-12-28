import { JSX } from "solid-js";
import Overview from "./pages/game/Home";
import Area from "./pages/game/Area";
import GlobalMarket from "./pages/game/GlobalMarket";
import Profile from "./pages/game/Profile";
import TimeTracker from "./pages/game/TimeTracker";
import Settings from "./pages/game/Settings";
import ResourceEditor from "./pages/game/ResourceEditor";
import Formation from "./pages/game/Formation";
import Rankings from "./pages/game/Rankings";
import Actions from "./pages/game/Actions";

export type RoutePath = "/" | "/actions" | "/area" | "/formation" | "/global-market" | "/profile" | "/rankings" |
  "/time-tracker" | "/resource-editor" | "/settings";

type Route = {
  path: RoutePath,
  component: () => JSX.Element;
};

export const Routes: Route[] = [
  {
    path: "/",
    component: Overview
  },
  {
    path: "/actions",
    component: Actions
  },
  {
    path: "/area",
    component: Area
  },
  {
    path: "/formation",
    component: Formation
  },
  {
    path: "/global-market",
    component: GlobalMarket
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/rankings",
    component: Rankings
  },
  {
    path: "/time-tracker",
    component: TimeTracker
  },
  {
    path: "/resource-editor",
    component: ResourceEditor
  },
  {
    path: "/settings",
    component: Settings
  }
];