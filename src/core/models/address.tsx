import { AddressType } from "../../types";

export default function transformAddress(data: AddressType) {
  const { firstName, lastName, city, houseNumber, lat, lon, postcode, street } =
    data;
  return {
    city: city || "",
    firstName: firstName || "",
    houseNumber: houseNumber || "",
    id: `${lat || Date.now()}_${lon || Math.random()}`,
    lastName: lastName || "",
    postcode: postcode || "",
    street: street || "",
  };
}
