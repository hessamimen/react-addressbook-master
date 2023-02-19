import React from "react";
import cx from "classnames";

import $ from "./Section.module.css";
import { SectionProps } from "../../../types";

const Section = ({ children, variant = "light" }: SectionProps) => {
  return (
    <section
      className={cx($.section, {
        [$.light]: variant === "light",
        [$.dark]: variant === "dark",
      })}
    >
      {children}
    </section>
  );
};

export default Section;
