import React from "react";
import { FormInitialState, SubmitFunction } from "../../types";

const useForm = (
  intialState: FormInitialState,
  onSubmitFunctions: SubmitFunction[]
) => {
  const [formData, setFormData] = React.useState(intialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // EXPLANATION: In this case, we needed two submit handling functions; defining the below function allows us to add multiple forms with separate submit functions
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    indexes: number[] = []
  ) => {
    event.preventDefault();
    indexes.forEach((index) => {
      const submitFunction = onSubmitFunctions[index];
      if (submitFunction) {
        submitFunction(formData);
      }
    });
  };

  const resetForm = () => {
    setFormData(intialState);
  };

  return { formData, handleInputChange, handleSubmit, resetForm };
};

export default useForm;
