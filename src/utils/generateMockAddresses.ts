const postCodeToCityMapping = {
  1: "Brisbane",
  2: "Sydney",
  3: "Melbourne",
  4: "Gold Coast",
  5: "Toowomba",
  6: "Burleigh",
  7: "Byron Bay",
  8: "Geelong",
  9: "Warrnambool",
};

const streetNumberToStreetMapping = {
  1: "Mary Street",
  2: "Edward Street",
  3: "Francesco Street",
  4: "Docklands Drive",
  5: "Elizabeth Street",
  6: "Black Spur Drive",
  7: "Grand Pacific Drive",
  8: "Paddys River Road",
  9: "Red Centre Way",
};

const generateMockAddresses = (
  postcode: string,
  streetNumber: string = "1",
  houseNumber: string
) => {
  const postcodeFirstChar = parseInt(postcode.substring(0, 1));
  const streetNumberFirstChar = parseInt(streetNumber.substring(0, 1));

  const postcodeMapping: string = (postCodeToCityMapping as any)[
    postcodeFirstChar
  ];
  const streetMapping: string = (streetNumberToStreetMapping as any)[
    streetNumberFirstChar
  ];

  if (postcodeMapping) {
    const addresses = [];
    //EXPLANATION: As it was required by test to send query by House number and postcode, I updated this part so we can have access to 10 house number(instead of the 3 initial houses).
    for (let i = 1; i < 10; i++) {
      addresses.push({
        id: Math.floor(Math.random() * 1000),
        city: postcodeMapping,
        houseNumber: i.toString(),
        postcode,
        street: `${10 - i} ${streetMapping}`,
        lat: Math.random(),
        long: Math.random(),
      });
    }
    return addresses.filter((item) => item.houseNumber === houseNumber);
  }

  return null;
};

export default generateMockAddresses;
