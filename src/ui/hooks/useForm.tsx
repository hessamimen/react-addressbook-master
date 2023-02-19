import React from "react";
import { FormInitialState } from "../../types";
import useAddressBook from "./useAddressBook";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const initialState = {
  postCode: "",
  houseNumber: "",
  firstName: "",
  lastName: "",
  selectedAddress: "",
};
const useForm = () => {
  /** useForm States */
  const [formData, setFormData] =
    React.useState<FormInitialState>(initialState);
  const { postCode, houseNumber, firstName, lastName, selectedAddress } =
    formData;
  /** Results states */
  const [addresses, setAddresses] = React.useState<any[]>([]);
  /** Error handling states */
  const [error, setError] = React.useState<string>("");
  /** Loading state in the UI while fetching addresses*/
  const [loading, setLoading] = React.useState<boolean>(false);
  /** Redux actions */
  const { addAddress } = useAddressBook();

  /** Function to handle changes in all form fields field */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /** Function to fetch data from the server when submiting the Address form */

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/getAddresses?postcode=${postCode}&housenumber=${houseNumber}`
      );
      setAddresses(res.data.details);
    } catch (err: any) {
      setError(err.response.data.errormessage);
    }
    setLoading(false);
  };

  /** Function to submit the persone name for each address */

  const handlePersonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === Number(selectedAddress)
    );

    addAddress({ ...foundAddress, firstName, lastName });
  };

  /**Reset the form field when hit the "Clear all fields button"*/
  const resetForm = () => {
    setFormData(initialState);
    setAddresses([]);
    setError("");
  };
  return {
    formData,
    handleInputChange,
    handleAddressSubmit,
    handlePersonSubmit,
    resetForm,
    addresses,
    error,
    loading,
  };
};

export default useForm;
