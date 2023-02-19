type AddressType = {
  id?: string;
  street: string;
  houseNumber: string;
  postcode: string;
  city: string;
  firstName: string;
  lastName: string;
  lat?: number;
  lon?: number;
};
type UseAddressBook = {
  addAddress: (address: AddressType) => void;
  removeAddress: (id: string) => void;
  loadSavedAddresses: () => Promise<void>;
  loading: boolean;
};
type SubmitFunction = (formData: FormInitialState) => void;

type FormInitialState = {
  postCode: string;
  houseNumber: string;
  firstName: string;
  lastName: string;
  selectedAddress: string;
};
type AddressProps = {
  address: AddressType;
};

type ButtonProps = {
  children?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  variant: string;
};

type CardProps = {
  children: React.ReactNode;
};

type errorMsgProps = {
  errorMsg: string;
};

type FormProps = {
  submitHandler: (e: React.FormEvent) => void;
  legendText: string;
  buttonText: string;
  formRows: {
    name: string;
    placeholder: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | string[];
};

type InputTextProps = {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
};

type RadioProps = {
  children: string;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type SectionProps = {
  children: React.ReactNode;
  variant: string;
};

export type {
  AddressType,
  AddressProps,
  ButtonProps,
  CardProps,
  errorMsgProps,
  FormProps,
  InputTextProps,
  RadioProps,
  SectionProps,
  FormInitialState,
  SubmitFunction,
  UseAddressBook,
};
