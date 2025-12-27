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
      <input type={props.type || "text"} class="input w-full" placeholder={props.placeholder ?? ""} onInput={props.onInput} />
      {(props.errText || props.optional) && <p class={"label" + (props.errText ? " text-red-400" : "")}>{props.errText || "Optional"}</p>}
    </fieldset>
  );
}

export default TextInput;