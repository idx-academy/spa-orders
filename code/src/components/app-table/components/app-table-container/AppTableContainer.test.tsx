import { render } from "@testing-library/react";

import AppTableContainer from "@/components/app-table/components/app-table-container/AppTableContainer";

describe("AppTableContainer", () => {
  test("renders with child content", () => {
    const { getByText } = render(
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
    expect(getByText(/Test/)).toBeInTheDocument();
  });
});
