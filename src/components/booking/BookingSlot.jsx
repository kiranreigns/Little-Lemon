const BookingSlot = ({ time, isAvailable, onSelect, isSelected }) => {
  return (
    <button
      onClick={() => isAvailable && onSelect(time)}
      className={`
        p-3 rounded-lg w-full text-center transition-colors
        ${
          isSelected
            ? "bg-primary-green text-white"
            : isAvailable
            ? "bg-primary-green/10 text-primary-green hover:bg-primary-green/20"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }
      `}
      disabled={!isAvailable}
    >
      {time}
      <span className="block text-sm">
        {isAvailable ? "Available" : "Booked"}
      </span>
    </button>
  );
};

export default BookingSlot;
