import React from "react";

import $ from "./InputText.module.css";
import { InputTextProps } from "../../../types";

const InputText = ({ name, onChange, placeholder, value }: InputTextProps) => {
  return (
    <input
      className={$.inputText}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  );
};

export default InputText;
