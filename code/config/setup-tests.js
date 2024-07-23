import React from "react";

import "@testing-library/jest-dom";
import crypto from "crypto";
import failOnConsole from "jest-fail-on-console";

global.React = React;

failOnConsole({ shouldFailOnWarn: true });

Object.defineProperty(global.self, "crypto", {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length)
  }
});

Object.defineProperty(global.self, "fetch", {
  value: () => new Promise()
});

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
    listen: jest.fn()
  })
}));

const mockNestedTranslations = jest
  .fn()
  .mockImplementation(({ id, values }) => {
    if (!values) {
      return id;
    }

    const nestedTranslations = Object.entries(values);

    if (nestedTranslations.length > 0) {
      const stringifiedValues = nestedTranslations.map(
        ([key, value]) => `${key}:${value}`
      );

      return `${id}/${stringifiedValues}`;
    }

    return id;
  });

jest.mock("react-intl", () => ({
  ...jest.requireActual("react-intl"),
  FormattedMessage: mockNestedTranslations,
  useIntl: jest.fn(() => ({
    formatMessage: mockNestedTranslations
  }))
}));

window.URL.createObjectURL = function () {};
