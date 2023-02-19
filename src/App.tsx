import React from "react";
// Custom Hooks
import useAddressBook from "./ui/hooks/useAddressBook";
import useForm from "./ui/hooks/useForm";
// Functions
import { handleAddressSubmit, handlePersonSubmit } from "./utils/functions";
// Components
import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import Form from "./ui/components/Form/Form";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";
// Styles
import styles from "../styles/App.module.css";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { postCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handlePostCodeChange for example
   */

  /** Results states */
  const [addresses, setAddresses] = React.useState<any[]>([]);
  /** Error handling states */
  const [error, setError] = React.useState<string | undefined>(undefined);
  /** Redux actions */
  const { addAddress } = useAddressBook();
  /** Loading state in the UI while fetching addresses*/
  const [loading, setLoading] = React.useState(false);
  /** Implement custom hook to set form fields in a more generic way*/
  const initialState = {
    postCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  };
  /* An arraye of functions to be able to have multiple submit handlers if needed */
  const onSubmitFunctions = [
    () =>
      handleAddressSubmit(
        postCode,
        houseNumber,
        setAddresses,
        setError,
        setLoading
      ),
    () =>
      handlePersonSubmit(
        addresses,
        selectedAddress,
        firstName,
        lastName,
        setError,
        addAddress
      ),
  ];
  /** Using the custom hook useForm by providing the initial states and submit Functions */
  const { formData, handleInputChange, handleSubmit, resetForm } = useForm(
    initialState,
    onSubmitFunctions
  );
  /** Destructure the data required from the useForm hook */
  const { postCode, houseNumber, firstName, lastName, selectedAddress } =
    formData;

  return (
    <main className={styles.scale_up_center}>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {/* EXPLANATION: here, we can define the submit function by providing the index from the onSubmitFunctions we defined earlier for each individual generic form */}
        <Form
          submitHandler={(event) => handleSubmit(event, [0])}
          legendText="🏠 Find an address"
          buttonText="Find"
          onChange={handleInputChange}
          // here we can easily add a new value to the value array and add a row to the formRows array if we need more input fields
          value={[postCode, houseNumber]}
          formRows={[
            {
              name: "postCode",
              placeholder: "Post Code",
            },
            {
              name: "houseNumber",
              placeholder: "House number",
            },
          ]}
        />
        {/* a simple loading mechanism added before rendering the address */}
        {loading
          ? "loading..."
          : addresses.length > 0 &&
            addresses.map((address) => {
              return (
                <Radio
                  name="selectedAddress"
                  id={address.id}
                  key={address.id}
                  onChange={handleInputChange}
                >
                  <Address address={address} />
                </Radio>
              );
            })}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {selectedAddress && (
          <Form
            submitHandler={(event) => handleSubmit(event, [1])}
            legendText="✏️ Add personal info to address"
            buttonText="Add to addressbook"
            onChange={handleInputChange}
            value={[firstName, lastName]}
            formRows={[
              {
                name: "firstName",
                placeholder: "First name",
              },
              {
                name: "lastName",
                placeholder: "Last name",
              },
            ]}
          ></Form>
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && (
          <div className={styles.error}>
            <ErrorMessage errorMsg={error} />
          </div>
        )}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button
          type="reset"
          variant="secondary"
          onClick={() => {
            resetForm();
            setAddresses([]);
            setError("");
          }}
        >
          Clear all fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
