import React, { useState } from "react";
import {
  LuCalendar,
  LuClock,
  LuUsers,
  LuGift,
  LuMapPin,
  LuUser,
  LuMail,
  LuPhone,
  LuMessageSquare,
} from "react-icons/lu";
import { submitAPI } from "../../services/api";
import BookingSlot from "./BookingSlot";
import { useNavigate } from "react-router-dom";

const FORM_FIELDS = {
  date: { label: "Date", icon: LuCalendar, type: "date", required: true },
  time: { label: "Time", icon: LuClock, type: "select", required: true },
  guests: {
    label: "Number of Guests",
    icon: LuUsers,
    type: "select",
    required: false,
  },
  occasion: {
    label: "Occasion",
    icon: LuGift,
    type: "select",
    required: false,
  },
  seating: {
    label: "Seating Preference",
    icon: LuMapPin,
    type: "select",
    required: false,
  },
  name: { label: "Name", icon: LuUser, type: "text", required: true },
  email: { label: "Email", icon: LuMail, type: "email", required: true },
  phone: { label: "Phone", icon: LuPhone, type: "tel", required: true },
  specialRequests: {
    label: "Special Requests",
    icon: LuMessageSquare,
    type: "textarea",
    required: false,
  },
};

const INITIAL_FORM_STATE = {
  date: "",
  time: "",
  guests: "2",
  occasion: "casual",
  seating: "indoor",
  name: "",
  email: "",
  phone: "",
  specialRequests: "",
};

const SELECT_OPTIONS = {
  guests: Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} ${i === 0 ? "Guest" : "Guests"}`,
  })),
  occasion: [
    { value: "casual", label: "Casual Dining" },
    { value: "birthday", label: "Birthday" },
    { value: "anniversary", label: "Anniversary" },
    { value: "business", label: "Business Meal" },
  ],
  seating: [
    { value: "indoor", label: "Indoor" },
    { value: "outdoor", label: "Outdoor" },
    { value: "bar", label: "Bar" },
  ],
};

const FormInput = ({
  field,
  value,
  error,
  onChange,
  options,
  availableTimes,
}) => {
  const { label, icon: Icon, type, required } = FORM_FIELDS[field];
  const inputId = `booking-${field}`; // Create unique ID for each input
  const baseClassName = `w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-dark ${
    error ? "border-red-500" : "border-gray-300"
  }`;

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={inputId}
            name={field}
            value={value}
            onChange={onChange}
            className={baseClassName}
          >
            {field === "time" ? (
              <>
                <option value="">Select time</option>
                {availableTimes?.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </>
            ) : (
              SELECT_OPTIONS[field]?.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))
            )}
          </select>
        );
      case "textarea":
        return (
          <textarea
            name={field}
            value={value}
            onChange={onChange}
            rows="4"
            placeholder={`Enter any ${label.toLowerCase()}...`}
            className={baseClassName}
          />
        );
      default:
        return (
          <input
            id={inputId}
            type={type}
            name={field}
            value={value}
            onChange={onChange}
            className={baseClassName}
            placeholder={
              type === "date" ? "" : `Enter ${label.toLowerCase()}...`
            }
            min={
              type === "date"
                ? new Date().toISOString().split("T")[0]
                : undefined
            }
          />
        );
    }
  };

  return (
    <div
      className={`space-y-2 ${
        field === "specialRequests" ? "md:col-span-2" : ""
      }`}
    >
      <label
        htmlFor={inputId}
        className="flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        <Icon className="w-4 h-4" />
        {label}
      </label>
      {renderInput()}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

const BookingForm = ({ availableTimes, updateTimes }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    Object.entries(FORM_FIELDS).forEach(([field, { required }]) => {
      if (required && !formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const success = await submitAPI(formData);
        if (success) {
          navigate("/booking-confirmed");
        } else {
          alert("Error submitting reservation. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "date") updateTimes(value);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Hide this section on mobile screens and show it on medium screens and above */}
      <div className="hidden md:block mx-auto mb-8 bg-white rounded-lg shadow-lg border-2 border-highlight-dark p-6">
        <h2 className="text-xl font-semibold mb-4">
          Available Time Slots: {formData.date}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availableTimes.map((time) => (
            <BookingSlot
              key={time}
              time={time}
              isAvailable={true}
              isSelected={formData.time === time}
              onSelect={(selectedTime) =>
                setFormData((prev) => ({ ...prev, time: selectedTime }))
              }
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg border-2 border-highlight-dark"
      >
        <div className="text-center p-6 border-b border-primary-green">
          <h1 className="text-4xl font-serif text-primary-green mb-2">
            Little Lemon
          </h1>
          <p className="text-lg text-gray-600">Reserve Your Table</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(FORM_FIELDS).map((field) => (
              <FormInput
                key={field}
                field={field}
                value={formData[field]}
                error={errors[field]}
                onChange={handleChange}
                availableTimes={availableTimes}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-8 bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-primary-green/90 transition-colors font-bold h-[50px] flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              <span>Reserve Table</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
