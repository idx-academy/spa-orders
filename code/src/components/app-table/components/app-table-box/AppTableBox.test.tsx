import { render } from "@testing-library/react";

import AppTableBox from "@/components/app-table/components/app-table-box/AppTableBox";

describe("AppTableBox", () => {
  test("renders with children", () => {
    const { getByText } = render(
      <AppTableBox>
        <tbody>
          <tr>
            <td>Test</td>
          </tr>
        </tbody>
      </AppTableBox>
    );
    expect(getByText(/Test/)).toBeInTheDocument();
  });
});
