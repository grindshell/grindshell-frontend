/* @refresh reload */
import { render } from "solid-js/web";
import Game from "./pages/Game";
import "./style.css";

render(() => <Game />, document.getElementById("root") as HTMLElement);
