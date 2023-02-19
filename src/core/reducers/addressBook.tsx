import { AddressType } from "../../types";

const defaultState = {
  addresses: [],
};

const reducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "address/add":
      /** TODO: Prevent duplicate addresses */

      //EXPLANATION Because of the nature of BE than I had to create random IDs to send queries based on postcode and the house number and not the initial setup, which query based on postcode and street number, so the existence of an address is checked by street, city, house number and postcode, which can be reduced to a line of code if ID can be used instead.

      const addressExists = state.addresses.some(
        (address: AddressType) =>
          address.street === action.payload.street &&
          address.city === action.payload.city &&
          address.houseNumber === action.payload.houseNumber &&
          address.postcode === action.payload.postcode
      );
      if (addressExists) {
        return state;
      }
      return { ...state, addresses: [...state.addresses, action.payload] };

    case "address/remove":
      /** TODO: Write a state update which removes an address from the addresses array. */
      const data = state.addresses.filter(
        (address: AddressType) => address.id !== action.payload
      );

      return { ...state, addresses: data || [] };
    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
