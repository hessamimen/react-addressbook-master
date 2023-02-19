import React from "react";
//Types
import { AddressProps } from "../../../types";
//Styles
import $ from "./Address.module.css";

const Address = ({ address }: AddressProps) => {
  return (
    <address className={$.address}>
      {address.street} {address.houseNumber}, {address.postcode}, {address.city}
    </address>
  );
};

export default Address;
