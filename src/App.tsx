import React from "react";

// Custom Hooks
import useForm from "./ui/hooks/useForm";
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
  const {
    formData,
    handleInputChange,
    handleAddressSubmit,
    handlePersonSubmit,
    resetForm,
    addresses,
    error,
    loading,
  } = useForm();
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
        <Form
          submitHandler={handleAddressSubmit}
          legendText="🏠 Find an address"
          buttonText="Find"
          onChange={handleInputChange}
          //** Here we can easily add a new value to the value arraye and add a row to the formRows array if we need more inpute fields*/
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
            submitHandler={handlePersonSubmit}
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
