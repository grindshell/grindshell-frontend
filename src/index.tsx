/* @refresh reload */
import { render } from "solid-js/web";
import LoginRegister from "./pages/LoginRegister";
import "./style.css";

render(() => <LoginRegister />, document.getElementById("root") as HTMLElement);
