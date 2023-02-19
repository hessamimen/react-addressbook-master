import React from "react";

import $ from "./Radio.module.css";
import { RadioProps } from "../../../types";

const Radio = ({ children, id, name, onChange }: RadioProps) => {
  return (
    <div className={$.radio}>
      <input type="radio" id={id} name={name} onChange={onChange} value={id} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default Radio;
