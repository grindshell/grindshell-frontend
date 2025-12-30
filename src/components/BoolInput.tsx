type Props = {
  onInput: (e: Event & { currentTarget: HTMLInputElement, target: HTMLInputElement; }) => void,
  legend?: string,
  value: boolean,
  enabledText: string,
  disabledText: string;
};

function BoolInput(props: Props) {
  return (
    <fieldset class="fieldset w-full text-content">
      {props.legend && <legend class="fieldset-legend">{props.legend}</legend>}
      <label class="label text-base-content">
        <input
          type="checkbox"
          checked={props.value}
          classList={{
            "toggle": true,
            "toggle-success": props.value
          }}
          onInput={props.onInput}
        />
        {props.value ? props.enabledText : props.disabledText}
      </label>
    </fieldset>
  );
}

export default BoolInput;