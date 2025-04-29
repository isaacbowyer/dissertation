import { resourceWithLikeAdapter } from "./resourceWithLikeAdapter";

const resource = {
  id: "resource1",
  symptomId: "symptom1",
  typeId: "type1",
  link: "https://example.com",
  information: "Resource information",
  companyName: "Company",
  companyDetails: "Company details",
  companyLogo: "logo.png",
  createdAt: new Date(),
};

describe("resourceWithLikeAdapter", () => {
  it("should adapt resource with like information correctly when likedResourceId is provided", () => {
    const payload = {
      userId: "user1",
      resource: resource,
      likedResourceId: "likedResource1",
      numberOfLikes: 5,
    };

    const adaptedResource = resourceWithLikeAdapter(payload);

    expect(adaptedResource.id).toBe("resource1");
    expect(adaptedResource.symptomId).toBe("symptom1");
    expect(adaptedResource.userId).toBe("user1");
    expect(adaptedResource.typeId).toBe("type1");
    expect(adaptedResource.link).toBe("https://example.com");
    expect(adaptedResource.information).toBe("Resource information");
    expect(adaptedResource.companyName).toBe("Company");
    expect(adaptedResource.companyDetails).toBe("Company details");
    expect(adaptedResource.companyLogo).toBe("logo.png");
    expect(adaptedResource.createdAt).toEqual(payload.resource.createdAt);
    expect(adaptedResource.numberOfLikes).toBe(5);
    expect(adaptedResource.isLiked).toBe(true);
    expect(adaptedResource.likedId).toBe("likedResource1");
  });

  it("should adapt resource with like information correctly when likedResourceId is not provided", () => {
    const payload = {
      userId: "user1",
      resource: resource,
      likedResourceId: "",
      numberOfLikes: 0,
    };

    const adaptedResource = resourceWithLikeAdapter(payload);

    expect(adaptedResource.id).toBe("resource1");
    expect(adaptedResource.symptomId).toBe("symptom1");
    expect(adaptedResource.userId).toBe("user1");
    expect(adaptedResource.typeId).toBe("type1");
    expect(adaptedResource.link).toBe("https://example.com");
    expect(adaptedResource.information).toBe("Resource information");
    expect(adaptedResource.companyName).toBe("Company");
    expect(adaptedResource.companyDetails).toBe("Company details");
    expect(adaptedResource.companyLogo).toBe("logo.png");
    expect(adaptedResource.createdAt).toEqual(payload.resource.createdAt);
    expect(adaptedResource.numberOfLikes).toBe(0);
    expect(adaptedResource.isLiked).toBe(false);
    expect(adaptedResource.likedId).toBe("");
  });
});
