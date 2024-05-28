import React from "react";

import crypto from "crypto";

import failOnConsole from "jest-fail-on-console";

const MOCK_TEST_LOCALE = 'en';

global.React = React;

failOnConsole({
  shouldFailOnWarn: true,
});

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});

jest.mock('react-redux', () => {
  const actualReactRedux = jest.requireActual('react-redux');

  return {
    ...actualReactRedux,
    useSelector: jest.fn(),
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
    listen: jest.fn(),
  }),
}));

const mockIntl = () => {
  const applicationModuleI18n = require('@/shared/modules/application/i18n/en.json');

  return {
    en: {
      ...applicationModuleI18n,
    },
  };
};

const internalMessages = mockIntl();

const formatMessage = (...args) => {
  let foundStr = internalMessages[MOCK_TEST_LOCALE][args[0].id] || '';
  for (let i = 1; i < args.length; i++) {
    for (let key in args[i]) {
      if (key !== 'id') {
        foundStr = foundStr.replace(new RegExp('{' + key + '}', 'g'), args[i][key]);
      }
    }
  }
  return foundStr;
};


window.URL.createObjectURL = function () {};