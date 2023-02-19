import React from "react";
//Types
import { ButtonProps } from "../../../types";
//Styles
import $ from "./Button.module.css";
import cx from "classnames";

const Button = ({
  children,
  onClick,
  type,
  variant = "primary", // or 'secondary'
}: ButtonProps) => {
  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={cx($.button, {
        [$.primary]: variant === "primary",
        [$.secondary]: variant === "secondary",
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
