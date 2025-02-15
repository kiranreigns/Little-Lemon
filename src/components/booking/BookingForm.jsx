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

const BookingForm = ({ availableTimes, updateTimes }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    occasion: "casual",
    seating: "indoor",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^\d{10}$/;
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
        // Simulate API call
        const success = await submitAPI(formData);

        if (success) {
          //console.log("Form submitted:", formData);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update available times when date changes
    if (name === "date") {
      updateTimes(value);
    }
  };

  return (
    <>
      {/* Visual time slots display */}
      <div className="w-11/12 mx-auto mb-8 bg-white rounded-lg shadow-lg border-2 border-highlight-dark p-6">
        <h2 className="text-xl font-semibold mb-4">
          Available Time Slots: {formData.date}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availableTimes.map((time) => (
            <BookingSlot
              key={time}
              time={time}
              isAvailable={true}
              onSelect={(selectedTime) => {
                setFormData((prev) => ({
                  ...prev,
                  time: selectedTime,
                }));
              }}
              isSelected={formData.time === time}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg border-2 border-highlight-dark">
          <div className="text-center p-6 border-b border-primary-green">
            <h1 className="text-4xl font-serif text-primary-green mb-2">
              Little Lemon
            </h1>
            <p className="text-lg text-gray-600">Reserve Your Table</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <LuCalendar className="w-4 h-4" />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-dark ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date}</p>
                )}
              </div>

              {/* Time Select */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <LuClock className="w-4 h-4" />
                  Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-dark ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select time</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-500 text-sm">{errors.time}</p>
                )}
              </div>

              {/* Guests Select */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <LuUsers className="w-4 h-4" />
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-dark"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num.toString()}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Occasion Select */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <LuGift className="w-4 h-4" />
                  Occasion
                </label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-dark"
                >
                  <option value="casual">Casual Dining</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business Meal</option>
                </select>
              </div>

              {/* Seating Select */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <LuMapPin className="w-4 h-4" />
                  Seating Preference
                </label>
                <select
                  name="seating"
                  value={formData.seating}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-dark"
                >
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="bar">Bar</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 space-y-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <LuUser className="w-4 h-4" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-dark ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <LuMail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-dark ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <LuPhone className="w-4 h-4" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="1234567890"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-dark ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                {/* Special Requests */}
                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <LuMessageSquare className="w-4 h-4" />
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    placeholder="Enter any special requests or dietary requirements..."
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-dark"
                  />
                </div>
              </div>
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                <span>Reserve Table</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
