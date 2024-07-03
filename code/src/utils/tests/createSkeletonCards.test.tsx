import generateProductSkeletons from "@/utils/createSkeletonCards";

describe("generateProductSkeletons", () => {
  it("should generate the correct number of ProductSkeleton components", () => {
    const numSkeletons = 5;
    const skeletons = generateProductSkeletons(numSkeletons);

    expect(skeletons).toHaveLength(numSkeletons);
  });

  it("should generate an empty array when the number is zero", () => {
    const numSkeletons = 0;
    const skeletons = generateProductSkeletons(numSkeletons);

    expect(skeletons).toHaveLength(0);
  });
});
