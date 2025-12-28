import Resizable from "@corvu/resizable";
import { createMemo, createSignal } from "solid-js";

function GlobalChat() {
  const CHAT_SIZE = 0.8;

  return (
    <Resizable class="size-full bg-base-200 resize-y" orientation="horizontal">
      <Resizable.Panel initialSize={1.0 - CHAT_SIZE} minSize={0.1}>
        <div class="size-full p-2">
          Channels
        </div>
      </Resizable.Panel>

      <Resizable.Handle class="min-w-1">
        <div class="size-full bg-base-300 hover:bg-black"></div>
      </Resizable.Handle>

      <Resizable.Panel initialSize={CHAT_SIZE} minSize={0.5}>
        <div class="size-full p-2 flex flex-col gap-2">
          <ChatInput />
          <ChatBox />
        </div>

      </Resizable.Panel>
    </Resizable>
  );
}

function ChatInput() {
  const [input, setInput] = createSignal("");
  const hasInput = createMemo(() => input().length > 0);

  return (
    <div class="flex flex-row gap-2">
      <input
        type="text"
        placeholder="Send a chat message or a chat command."
        class="input grow"
        onInput={(e) => setInput(e.target.value)}
      />
      <button
        classList={{
          "btn": true,
          "btn-soft": hasInput(),
          "btn-disabled": !hasInput()
        }}
      >Send</button>
    </div>
  );
}

function ChatBox() {
  return (
    <div class="grow border-4 border-base-300 rounded">
      <ul>

      </ul>
    </div>
  );
}

function ChatMessage() {
  return (
    <li>

    </li>
  );
}

export default GlobalChat;