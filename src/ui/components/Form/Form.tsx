import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import $ from "./Form.module.css";
import { FormProps } from "../../../types";

const Form = ({
  submitHandler,
  legendText,
  buttonText,
  formRows,
  onChange,
  value,
}: FormProps) => {
  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <legend>{legendText}</legend>
        {formRows.map((row, index) => (
          <div key={index} className={$.formRow}>
            <InputText
              name={row.name}
              placeholder={row.placeholder}
              onChange={onChange}
              value={value[index]}
            />
          </div>
        ))}
        <Button variant="primary" type="submit">
          {buttonText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
