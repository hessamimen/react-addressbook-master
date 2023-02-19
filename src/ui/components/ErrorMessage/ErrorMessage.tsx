import React from "react";
import { errorMsgProps } from "../../../types";

const ErrorMessage = ({ errorMsg }: errorMsgProps) => {
  return <div>{errorMsg}</div>;
};

export default ErrorMessage;
