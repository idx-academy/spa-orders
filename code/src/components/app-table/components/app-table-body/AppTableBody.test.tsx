import { render } from "@testing-library/react";

import AppTableBody from "@/components/app-table/components/app-table-body/AppTableBody";

describe("AppTableBody", () => {
  test("renders with children", () => {
    const { getByText } = render(
      <table>
        <AppTableBody>
          <tr>
            <td>Test</td>
          </tr>
        </AppTableBody>
      </table>
    );
    expect(getByText(/Test/)).toBeInTheDocument();
  });
});
