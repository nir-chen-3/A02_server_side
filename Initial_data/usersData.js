export const usersData = [
  {
    name: { first: "Regular", middle: "Rr", last: "User" },
    email: "regular@example.com",
    password: "Abc!123Abc",
    phone: "0500000001",
    address: {
      state: "IL",
      country: "Israel",
      city: "TLV",
      street: "Main",
      houseNumber: 1,
      zip: 12345,
    },
    image: {
      url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
      alt: "avatar image",
    },
    isBusiness: false,
  },
  {
    name: { first: "Business", middle: "Bb", last: "User" },
    email: "business@example.com",
    password: "Abc!123Abc",
    phone: "0500000002",
    address: {
      state: "IL",
      country: "Israel",
      city: "Haifa",
      street: "Sea",
      houseNumber: 2,
      zip: 54321,
    },
    image: {
      url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
      alt: "avatar image",
    },
    isBusiness: true,
  },
  {
    name: { first: "Admin", middle: "Aa", last: "User" },
    email: "admin@example.com",
    password: "Abc!123Abc",
    phone: "0500000003",
    address: {
      state: "IL",
      country: "Israel",
      city: "Jerusalem",
      street: "Hill",
      houseNumber: 3,
      zip: 67890,
    },
    image: {
      url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
      alt: "avatar image",
    },
    isBusiness: true,
  },
];

export const user_admin_dataFlag = [false, false, true];
