import React, { ReactNode } from "react";
//Types
import { CardProps } from "../../../types";
//Styles
import $ from "./Card.module.css";

const Card = ({ children }: CardProps) => {
  return <div className={$.card}>{children}</div>;
};

export default Card;
