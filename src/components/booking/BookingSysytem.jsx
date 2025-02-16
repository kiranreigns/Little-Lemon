import React, { useReducer } from "react";
import BookingForm from "./BookingForm";
import { fetchAPI } from "../../services/api";

const initializeTimes = () => {
  // Fetch available times for today's date
  const today = new Date();
  return {
    availableTimes: fetchAPI(today),
  };
};

const timesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      // Fetch available times for the selected date
      const selectedDate = new Date(action.payload);
      return {
        ...state,
        availableTimes: fetchAPI(selectedDate),
      };
    default:
      return state;
  }
};

const BookingSystem = () => {
  const [state, dispatch] = useReducer(timesReducer, null, initializeTimes);

  const updateTimes = (date) => {
    dispatch({ type: "UPDATE_TIMES", payload: date });
  };

  return (
    <BookingForm
      availableTimes={state.availableTimes}
      updateTimes={updateTimes}
    />
  );
};

export default BookingSystem;
