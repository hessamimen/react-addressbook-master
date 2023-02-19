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
  streetNumber: string = "2",
  // streetNumber: string = (Math.floor(Math.random() * 9) + 1).toString(),
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
    return [
      {
        id: Math.floor(Math.random() * 1000),
        city: postcodeMapping,
        houseNumber: "1",
        postcode,
        street: `${streetNumber} ${streetMapping}`,
        lat: Math.random(),
        long: Math.random(),
      },
      {
        id: Math.floor(Math.random() * 1000),
        city: postcodeMapping,
        houseNumber: "2",
        postcode,
        street: `${streetNumber} ${streetMapping}`,
        lat: Math.random(),
        long: Math.random(),
      },
      {
        id: Math.floor(Math.random() * 1000),
        city: postcodeMapping,
        houseNumber: "3",
        postcode,
        street: `${streetNumber} ${streetMapping}`,
        lat: Math.random(),
        long: Math.random(),
      },
    ].filter((item) => item.houseNumber === houseNumber);
  }

  return null;
};

export default generateMockAddresses;
