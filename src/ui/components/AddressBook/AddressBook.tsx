import React from "react";
import { useSelector } from "react-redux";
//Custom Hooks
import useAddressBook from "../../hooks/useAddressBook";
//Components
import Address from "../Address/Address";
import Button from "../Button/Button";
import Card from "../Card/Card";
//Styles
import $ from "./AddressBook.module.css";
//Types
import { AddressType } from "../../../types";

const AddressBook: React.FC = () => {
  const addresses = useSelector((state: any) => state.addressBook.addresses);

  const { removeAddress, loadSavedAddresses, loading } = useAddressBook();

  React.useEffect(() => {
    loadSavedAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={$.addressBook}>
      <h2>📓 Address book ({addresses.length})</h2>
      {!loading && (
        <>
          {addresses.length === 0 && <p>No addresses found, try add one 😉</p>}
          {addresses.map((address: AddressType) => {
            return (
              <Card key={address.id}>
                <div className={$.item}>
                  <div>
                    <h3>
                      {address.firstName} {address.lastName}
                    </h3>
                    <Address address={address} />
                  </div>
                  <div className={$.remove}>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        removeAddress(address.id as string);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </>
      )}
    </section>
  );
};

export default AddressBook;
