import repeatComponent from "@/utils/repeat-component/repeatComponent";

const component = <div></div>;

describe("repeatComponent", () => {
  it("should generate the correct number of components", () => {
    const copiesCount = 5;
    const components = repeatComponent(component, copiesCount);

    expect(components).toHaveLength(copiesCount);
  });

  it("should generate an empty array when the copiesCount is zero", () => {
    const copiesCount = 0;
    const components = repeatComponent(component, copiesCount);

    expect(components).toHaveLength(0);
  });
});
