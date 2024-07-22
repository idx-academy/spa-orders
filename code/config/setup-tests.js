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

const mockTranslationImplementation = jest
  .fn()
  .mockImplementation(({ id }) => id);

jest.mock("react-intl", () => ({
  ...jest.requireActual("react-intl"),
  FormattedMessage: mockTranslationImplementation,
  useIntl: jest.fn().mockImplementation(() => ({
    formatMessage: mockTranslationImplementation
  }))
}));

window.URL.createObjectURL = function () {};
