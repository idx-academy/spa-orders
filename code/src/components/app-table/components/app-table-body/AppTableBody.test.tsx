import { render, screen } from "@testing-library/react";

import AppTableBody from "@/components/app-table/components/app-table-body/AppTableBody";

describe("AppTableBody", () => {
  test("renders with children", () => {
    render(
      <table>
        <AppTableBody>
          <tr>
            <td>Test</td>
          </tr>
        </AppTableBody>
      </table>
    );
    const child = screen.getByText(/Test/);
    expect(child).toBeInTheDocument();
  });
});
