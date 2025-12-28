type Props = {
  onInput: (e: Event & { currentTarget: HTMLInputElement, target: HTMLInputElement; }) => void,
  type?: string,
  legend?: string,
  placeholder?: string,
  optional?: boolean,
  errText?: string;
};

function TextInput(props: Props) {
  return (
    <fieldset class="fieldset w-full">
      {props.legend && <legend class="fieldset-legend">{props.legend}</legend>}
      <input
        type={props.type || "text"}
        class="input w-full"
        placeholder={props.placeholder ?? ""}
        onInput={props.onInput}
      />
      {(props.errText || props.optional) && <p
        classList={{
          "label": true,
          "text-red-400": props.errText !== undefined
        }}
      >{props.errText || "Optional"}</p>}
    </fieldset>
  );
}

export default TextInput;