import React from "react";
import { Link } from "react-router-dom";

const ConfirmedBooking = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <img
            src="/little_lemon.png"
            alt="Little Lemon"
            className="h-20 mx-auto mb-4"
          />
          <h1 className="text-4xl font-serif text-primary-green mb-4">
            Booking Confirmed!
          </h1>
          <div className="bg-white rounded-lg shadow-lg border-2 border-highlight-dark p-8 mb-8">
            <div className="text-xl text-gray-700 mb-6">
              Thank you for choosing Little Lemon! Your table has been
              successfully reserved.
            </div>
            <div className="text-gray-600">
              A confirmation email will be sent to you shortly with your booking
              details.
            </div>
          </div>
          <Link
            to="/"
            className="inline-block bg-primary-green text-white py-3 px-6 rounded-lg hover:bg-primary-green/90 transition-colors font-bold"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConfirmedBooking;
