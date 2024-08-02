import { render } from "@testing-library/react";

import getTagIn from "@/utils/get-tag-in/getTagIn";

describe("Test ", () => {
  test("Should find desired element", () => {
    render(
      <div data-testid="test">
        <textarea />
      </div>
    );

    const test = getTagIn("test", "textarea");
    expect(test).toBeInTheDocument();
  });
});
