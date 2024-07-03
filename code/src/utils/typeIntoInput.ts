import { act, fireEvent } from "@testing-library/react";

const typeIntoInput = async (
  input: Parameters<typeof fireEvent.change>[0],
  value: string | number
) => {
  await act(async () => {
    fireEvent.change(input, { target: { value } });
  });
};

export default typeIntoInput;
