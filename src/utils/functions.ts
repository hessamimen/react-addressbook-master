import axios from "axios";

// Function to fetch data from the server when submiting the Address form
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
