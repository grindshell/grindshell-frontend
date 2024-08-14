/* @refresh reload */
import { render } from "solid-js/web";

function NotFound() {
  return (
    <>
      <div class="absolute inset-0 bg-zinc-900" />
      <div>hello</div>
    </>
  )
}

render(() => <NotFound />, document.getElementById("root") as HTMLElement);
