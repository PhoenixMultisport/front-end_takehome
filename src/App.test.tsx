import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from './App';
// import * as renderer from "react-test-renderer";
// import userEvent from "@testing-library/user-event";


//required to make antd handshake with jest
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("test to show jest/typescript is ready to be built out", () => {
  test("confirm app loads", () => {
      render(<App />);
   });
});