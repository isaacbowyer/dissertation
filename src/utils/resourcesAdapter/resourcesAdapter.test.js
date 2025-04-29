import { resourcesAdapter } from "./resourcesAdapter";

const mockDocs = [
  {
    id: "1",
    data: jest.fn(() => ({
      symptomId: "symptom1",
      typeId: "type1",
      link: "https://example.com",
      information: "Resource information",
      companyName: "Company",
      companyDetails: "Company details",
      companyLogo: "logo.png",
      createdAt: { toDate: jest.fn(() => new Date()) },
    })),
  },
  {
    id: "2",
    data: jest.fn(() => ({
      symptomId: "symptom2",
      typeId: "type2",
      link: "https://example2.com",
      information: "Resource information 2",
      companyName: "Company 2",
      companyDetails: "Company details 2",
      companyLogo: "logo2.png",
      createdAt: { toDate: jest.fn(() => new Date()) },
    })),
  },
];

describe("resourcesAdapter", () => {
  it("should adapt resource documents correctly", () => {
    const props = {
      userId: "user1",
      resourceDocs: mockDocs,
    };

    const adaptedResources = resourcesAdapter(props);

    expect(adaptedResources).toHaveLength(2);
    expect(adaptedResources[0]).toEqual({
      id: "1",
      symptomId: "symptom1",
      typeId: "type1",
      link: "https://example.com",
      information: "Resource information",
      companyName: "Company",
      companyDetails: "Company details",
      companyLogo: "logo.png",
      createdAt: expect.any(Date),
    });
    expect(adaptedResources[1]).toEqual({
      id: "2",
      symptomId: "symptom2",
      typeId: "type2",
      link: "https://example2.com",
      information: "Resource information 2",
      companyName: "Company 2",
      companyDetails: "Company details 2",
      companyLogo: "logo2.png",
      createdAt: expect.any(Date),
    });
  });

  it("should return an empty array if resourceDocs is null", () => {
    const propsNull = {
      userId: "user1",
      resourceDocs: null,
    };

    const adaptedResourcesNull = resourcesAdapter(propsNull);
    expect(adaptedResourcesNull).toEqual([]);
  });
});
