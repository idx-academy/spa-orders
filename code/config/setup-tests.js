import React from "react";
import crypto from "crypto";
import failOnConsole from "jest-fail-on-console";
import "@testing-library/jest-dom";

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

jest.mock("react-intl", () => ({
  ...jest.requireActual("react-intl"),
  FormattedMessage: jest.fn().mockImplementation(({ id }) => id)
}));

window.URL.createObjectURL = function () {};
