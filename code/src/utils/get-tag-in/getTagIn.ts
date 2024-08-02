import { screen } from "@testing-library/react";

const getTagIn = <T extends keyof HTMLElementTagNameMap = "input">(
  testId: string,
  tag: T = "input" as T
) => {
  return screen
    .getByTestId(testId)
    .querySelector(tag)! as unknown as HTMLElementTagNameMap[T];
};

export default getTagIn;
