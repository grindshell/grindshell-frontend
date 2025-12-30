import { For } from "solid-js";

type Props = {
  onInput: (e: Event & { currentTarget: HTMLSelectElement, target: HTMLSelectElement; }) => void,
  legend?: string,
  options: string[],
  initialValue?: string,
  noSelectionText?: string,
  label?: string;
};

function SelectInput(props: Props) {
  return (
    <fieldset class="fieldset w-full">
      {props.legend && <legend class="fieldset-legend">{props.legend}</legend>}
      <label class="label text-base-content">
        <select
          class="select mr-2"
          onInput={props.onInput}
        >
          {!props.initialValue && <option disabled selected>{props.noSelectionText ?? "Make a selection"}</option>}
          <For each={props.options}>
            {(opt) => <option selected={props.initialValue === opt}>{opt}</option>}
          </For>
        </select>
        {props.label}
      </label>
    </fieldset>
  );
}

export default SelectInput;