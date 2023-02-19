import type { NextApiRequest, NextApiResponse } from "next";

import generateMockAddresses from "../../src/utils/generateMockAddresses";
type Error = {
  status: string;
  errormessage: string;
};
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { postcode, streetnumber, housenumber },
  } = req;

  if (!postcode || !housenumber) {
    return res.status(400).send({
      status: "error",
      errormessage: "Postcode and house number fields mandatory!",
    });
  }

  if (postcode.length < 4) {
    return res.status(400).send({
      status: "error",
      errormessage: "Postcode must be at least 4 digits!",
    });
  }
  if (+housenumber > 3) {
    return res.status(400).send({
      status: "error",
      errormessage: "House Number must be below 4!",
    });
  }

  /** TODO: Refactor the code below so there is no duplication of logic for postCode/houseNumber digit checks. */

  //EXPLANATION:  The previous implementation was converting the input to an integer, so when the first character was a letter, it would throw an error; otherwise, if the letter was at the end, it wouldn't throw an error!
  //Now it checks the whole input with a regex pattern to have all characters be digits, and there is no duplication in that logic.
  const validateInput = (input: string, name: string): Error | null => {
    const isInputAllDigits = /^\d+$/.test(input);

    if (!isInputAllDigits) {
      return {
        status: "error",
        errormessage: `${name} must be all digits!`,
      };
    }
    return null;
  };

  const postCodeError = validateInput(postcode as string, "Postcode");
  const houseNumberError = validateInput(housenumber as string, "House number");
  if (postCodeError) {
    return res.status(400).send(postCodeError);
  }
  if (houseNumberError) {
    return res.status(400).send(houseNumberError);
  }

  const mockAddresses = generateMockAddresses(
    postcode as string,
    streetnumber as string,
    housenumber as string
  );
  if (mockAddresses) {
    return res.status(200).json({
      status: "ok",
      details: mockAddresses,
    });
  }

  return res.status(404).json({
    status: "error",
    errormessage: "No results found!",
  });
}
