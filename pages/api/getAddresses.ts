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

  /** TODO: Refactor the code below so there is no duplication of logic for postCode/streetNumber digit checks. */

  const postCode = parseInt(postcode as string);

  if (isNaN(postCode)) {
    return res.status(400).send({
      status: "error",
      errormessage: "Postcode must be all digits!",
    });
  }

  const streetNumber = parseInt(streetnumber as string);
  const houseNumber = parseInt(housenumber as string);

  // if (isNaN(streetNumber)) {
  //   return res.status(400).send({
  //     status: "error",
  //     errormessage: "Street number must be all digits!",
  //   });
  // }
  if (isNaN(houseNumber)) {
    return res.status(400).send({
      status: "error",
      errormessage: "Street number must be all digits!",
    });
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
