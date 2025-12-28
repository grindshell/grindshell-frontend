type Props = {
  onInput: (e: Event & { currentTarget: HTMLInputElement, target: HTMLInputElement; }) => void,
  legend?: string,
  value: boolean,
  enabledText: string,
  disabledText: string;
};

function BoolInput(props: Props) {
  return (
    <fieldset class="fieldset w-full">
      {props.legend && <legend class="fieldset-legend">{props.legend}</legend>}
      <label
        classList={{
          "label": true,
          "text-primary-content": props.value
        }}
      >
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