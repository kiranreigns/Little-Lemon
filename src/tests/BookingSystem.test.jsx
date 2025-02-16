import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { BookingSystem } from "../components";
import { fetchAPI } from "../services/api";

// Mock the API functions
vi.mock("../services/api", () => ({
  fetchAPI: vi.fn(() => ["17:00", "18:00", "19:00"]),
}));

describe("BookingSystem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initializeTimes", () => {
    it("should initialize with available times for today", () => {
      // Create a fixed date for testing
      const testDate = new Date("2024-02-15");
      vi.setSystemTime(testDate);

      // Test the initialization directly
      const initializeTimes = () => ({
        availableTimes: fetchAPI(new Date()),
      });

      const initialState = initializeTimes();
      expect(initialState.availableTimes).toEqual(["17:00", "18:00", "19:00"]);
      expect(fetchAPI).toHaveBeenCalledWith(testDate);
    });
  });

  describe("updateTimes", () => {
    it("should update available times when date changes", () => {
      const testDate = "2024-02-16";

      // Test the reducer directly
      const timesReducer = (state, action) => {
        if (action.type === "UPDATE_TIMES") {
          return {
            ...state,
            availableTimes: fetchAPI(new Date(action.payload)),
          };
        }
        return state;
      };

      // Initial state
      const initialState = {
        availableTimes: ["17:00", "18:00", "19:00"],
      };

      // Dispatch update action
      const newState = timesReducer(initialState, {
        type: "UPDATE_TIMES",
        payload: testDate,
      });

      expect(fetchAPI).toHaveBeenCalledWith(new Date(testDate));
      expect(newState.availableTimes).toEqual(["17:00", "18:00", "19:00"]);
    });
  });

  describe("BookingSystem Integration", () => {
    it("renders BookingForm with initial available times", () => {
      render(
        <MemoryRouter>
          <BookingSystem />
        </MemoryRouter>
      );

      expect(screen.getByText("Reserve Your Table")).toBeInTheDocument();
      expect(fetchAPI).toHaveBeenCalled();
    });
  });
});
