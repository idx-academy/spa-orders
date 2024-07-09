import { render, screen } from "@testing-library/react";

import AppTableContainer from "@/components/app-table/components/app-table-container/AppTableContainer";

describe("AppTableContainer", () => {
  test("renders with child content", () => {
    render(
      <AppTableContainer>
        <table>
          <tbody>
            <tr>
              <td>Test</td>
            </tr>
          </tbody>
        </table>
      </AppTableContainer>
    );

    const child = screen.getByText(/Test/);
    expect(child).toBeInTheDocument();
  });
});
