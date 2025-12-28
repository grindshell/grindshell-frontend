import { JSX } from "solid-js";
import Overview from "./pages/game/Home";
import Area from "./pages/game/Area";
import GlobalMarket from "./pages/game/GlobalMarket";
import Profile from "./pages/game/Profile";
import TimeTracker from "./pages/game/TimeTracker";
import Settings from "./pages/game/Settings";

export type RoutePath = "/" | "/area" | "/formation" | "/global-market" | "/profile" |
  "/time-tracker" | "/settings";

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
    path: "/area",
    component: Area
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
    path: "/time-tracker",
    component: TimeTracker
  },
  {
    path: "/settings",
    component: Settings
  }
];