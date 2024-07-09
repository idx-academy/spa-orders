import { render, screen } from "@testing-library/react";

import AppTable from "@/components/app-table/AppTable";

describe("AppTable", () => {
  const headItems = ["Header 1", "Header 2"];
  const bodyItems = [
    { id: 1, value: "Row 1" },
    { id: 2, value: "Row 2" }
  ];

  const renderHeadItem = (item: string) => <th key={item}>{item}</th>;
  const renderBodyItem = (item: { id: number; value: string }) => (
    <tr key={item.id}>
      <td>{item.value}</td>
    </tr>
  );

  test("renders head items correctly", () => {
    render(
      <AppTable
        headItems={headItems}
        bodyItems={bodyItems}
        renderBodyItem={renderBodyItem}
        renderHeadItem={renderHeadItem}
      />
    );
    headItems.forEach((item) => {
      const headItem = screen.getByText(item);
      expect(headItem).toBeInTheDocument();
    });
  });

  test("renders body items correctly", () => {
    render(
      <AppTable
        headItems={headItems}
        bodyItems={bodyItems}
        renderBodyItem={renderBodyItem}
        renderHeadItem={renderHeadItem}
      />
    );
    bodyItems.forEach((item) => {
      const bodyItem = screen.getByText(item.value);
      expect(bodyItem).toBeInTheDocument();
    });
  });
});
