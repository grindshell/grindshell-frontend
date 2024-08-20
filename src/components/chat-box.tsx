import { Index, createSignal } from "solid-js";

import { TextField, TextFieldTextArea, TextFieldInput } from "~/components/solidui/text-field";
import { Separator } from "~/components/solidui/separator";
import { Button } from "~/components/solidui/button";

export function ChatBox() {
  const [msgs, setMsgs] = createSignal([
    "test message 1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
  ]);

  return (
    <div class="flex flex-col h-full p-2">
      <div class="flex flex-row my-2">
        <TextField class="grow mr-2">
          <TextFieldInput type="text" />
        </TextField>
        <Button>Send</Button>
      </div>

      <div class="my-2 border rounded-lg overflow-y-auto resize-y">
        <div class="p-2">
          <Index each={msgs()}>
            {(item) => (
              <p>{item()}</p>
            )}
          </Index>
        </div>
      </div>

      {/* <TextField class="my-2" value="
      
      
      




      
      
      \\n\n\n\n\n\n">
        <TextFieldTextArea readOnly />
      </TextField> */}
    </div>
  )
}