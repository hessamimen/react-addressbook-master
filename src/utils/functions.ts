import axios from "axios";

// Function to fetch data from the server when submitting the Address form.
const BASE_URL = "http://localhost:3000";

export const handleAddressSubmit = async (
  postCode: string,
  houseNumber: string,
  setAddresses: React.Dispatch<React.SetStateAction<any[]>>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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

//Function to submit the person's name for each address

export const handlePersonSubmit = (
  addresses: any,
  selectedAddress: string,
  firstName: string,
  lastName: string,
  setError: React.Dispatch<React.SetStateAction<any>>,
  addAddress: (arg0: any) => void
) => {
  if (!selectedAddress || !addresses.length) {
    setError(
      "No address selected, try to select an address or find one if you haven't"
    );
    return;
  }

  const foundAddress = addresses.find(
    (address: any) => address.id === Number(selectedAddress)
  );

  addAddress({ ...foundAddress, firstName, lastName });
};
