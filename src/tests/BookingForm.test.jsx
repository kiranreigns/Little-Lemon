import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BookingForm } from "../components";
import { submitAPI } from "../services/api";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock the submitAPI function
vi.mock("../services/api", () => ({
  submitAPI: vi.fn((formData) => Promise.resolve("Success")),
}));

describe("BookingForm", () => {
  const mockAvailableTimes = ["17:00", "18:00", "19:00"];
  const mockUpdateTimes = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all form fields", () => {
    render(
      <MemoryRouter>
        <BookingForm
          availableTimes={mockAvailableTimes}
          updateTimes={mockUpdateTimes}
        />
      </MemoryRouter>
    );

    // Verify all required form fields are present
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of Guests")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
  });

  it("should show validation errors for required fields", async () => {
    render(
      <MemoryRouter>
        <BookingForm
          availableTimes={mockAvailableTimes}
          updateTimes={mockUpdateTimes}
        />
      </MemoryRouter>
    );

    // Submit form without filling required fields
    const submitButton = screen.getByText("Reserve Table");
    fireEvent.click(submitButton);

    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText("Date is required")).toBeInTheDocument();
      expect(screen.getByText("Time is required")).toBeInTheDocument();
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Phone is required")).toBeInTheDocument();
    });
  });

  it("should submit form successfully with valid data", async () => {
    const { container } = render(
      <MemoryRouter>
        <BookingForm
          availableTimes={mockAvailableTimes}
          updateTimes={mockUpdateTimes}
        />
      </MemoryRouter>
    );

    // Get the form element
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();

    // Fill in form fields using fireEvent
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2024-02-16", name: "date" },
    });

    fireEvent.change(screen.getByLabelText("Time"), {
      target: { value: "17:00", name: "time" },
    });

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe", name: "name" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com", name: "email" },
    });

    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "1234567890", name: "phone" },
    });

    // Submit the form
    fireEvent.submit(form);

    // Verify that submitAPI was called
    await waitFor(() => {
      expect(submitAPI).toHaveBeenCalled();
    });

    // Verify that submitAPI returns "Success"
    const result = await submitAPI.mock.results[0].value;
    expect(result).toBe("Success");
  });
});
