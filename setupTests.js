// setupTests.js
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Add matchMedia polyfill
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      media: "",
      onchange: null,
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return false;
      },
    };
  };
