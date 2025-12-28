import { createEffect, createSignal, onMount } from "solid-js";

function GameErrorDisplay(err: Error, _reset: () => void) {
  const [paused, setPaused] = createSignal(false);
  const [count, setCount] = createSignal(5);
  const [countdownClass, setCountdownClass] = createSignal("countdown text-green-500");

  let id!: number;
  const startCount = () => id = setInterval(() => setCount((v) => v - 1), 1000) as unknown as number;

  function toLogin() {
    window.location.replace("/");
  }

  onMount(() => startCount());

  createEffect(() => {
    switch (count()) {
      case 0: {
        toLogin();
        break;
      }
      case 1:
      case 2: {
        setCountdownClass("countdown text-red-500");
        break;
      }
      default: {
        setCountdownClass("countdown text-green-500");
        break;
      }
    }
    if (count() === 0) {
      toLogin();
    }

    if (paused()) {
      clearInterval(id);
    }
  });

  return (
    <div class="flex h-screen">
      <div class="m-auto justify-center text-center">
        <p>An unhandled error occurred:</p>
        <h1 class="text-2xl p-10 border rounded-2xl">{err.message}</h1>
        <p>
          You will be redirected to the login page in <span class={countdownClass()}>{count()}</span> or click <a class="text-blue-500 hover:cursor-pointer hover:underline" onClick={toLogin}>here</a> to go immediately.
        </p>
        <button class="btn btn-primary mt-4" onClick={() => {
          setPaused((v) => {
            const newVal = !v;
            if (!newVal) {
              startCount();
            }

            return newVal;
          });
        }}>{paused() ? "Start" : "Stop"} countdown</button>
      </div>
    </div>
  );
}

export default GameErrorDisplay;