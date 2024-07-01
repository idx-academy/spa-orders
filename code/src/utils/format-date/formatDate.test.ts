import formatDate from "@/utils/format-date/formatDate";

describe("formatDate", () => {
  test("formats date to default locale and options", () => {
    const backendDate = "2024-06-27T12:35:14.396Z";
    const formattedDate = formatDate(backendDate);
    expect(formattedDate).toBe("27/06/2024, 15:35:14");
  });

  test("formats date with custom locale", () => {
    const backendDate = "2024-06-27T12:35:14.396Z";
    const formattedDate = formatDate(backendDate, { locale: "en-US" });
    expect(formattedDate).toBe("06/27/2024, 15:35:14");
  });

  test("formats date with custom options", () => {
    const backendDate = "2024-06-27T12:35:14.396Z";
    const formattedDate = formatDate(backendDate, {
      options: { weekday: "long" }
    });
    expect(formattedDate).toBe("Thursday, 27/06/2024, 15:35:14");
  });
});
