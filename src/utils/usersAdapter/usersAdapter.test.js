import { usersAdapter } from "./usersAdapter";

const mockDocs = [
  {
    id: "1",
    data: () => ({
      firstName: "John",
      lastName: "Doe",
      companyName: "ABC Inc.",
      country: "USA",
      industry: "Technology",
      gender: "Male",
      dateOfBirth: {
        toDate: () => new Date("1990-01-01"),
      },
    }),
  },
  {
    id: "2",
    data: () => ({
      firstName: "Alice",
      lastName: "Smith",
      companyName: "XYZ Corp.",
      country: "UK",
      industry: "Finance",
      gender: "Female",
      dateOfBirth: {
        toDate: () => new Date("1985-05-10"),
      },
    }),
  },
];

describe("usersAdapter function", () => {
  it("maps document snapshots to user objects correctly", () => {
    const expectedUsers = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        companyName: "ABC Inc.",
        country: "USA",
        industry: "Technology",
        gender: "Male",
        birthDate: new Date("1990-01-01"),
      },
      {
        id: "2",
        firstName: "Alice",
        lastName: "Smith",
        companyName: "XYZ Corp.",
        country: "UK",
        industry: "Finance",
        gender: "Female",
        birthDate: new Date("1985-05-10"),
      },
    ];

    expect(usersAdapter(mockDocs)).toEqual(expectedUsers);
  });

  it("returns an empty array if no documents are provided", () => {
    expect(usersAdapter([])).toEqual([]);
  });

  it("returns an empty array if docs parameter is null", () => {
    expect(usersAdapter(null)).toEqual([]);
  });
});
