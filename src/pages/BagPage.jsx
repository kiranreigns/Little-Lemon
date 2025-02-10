import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BagContext } from "../components";
import { FaTrash } from "react-icons/fa";

const BagItem = React.memo(({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full sm:w-32 h-50 lg:h-32">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
          loading="lazy"
        />
      </div>

      <div className="flex-grow space-y-2 w-full sm:w-auto">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          {item.size && <span>Size: {item.size}</span>}
          {item.color && (
            <span className="flex items-center gap-1">
              Color:
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: item.color }}
              />
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <select
            value={item.quantity}
            onChange={(e) => onQuantityChange(item.id, Number(e.target.value))}
            className="w-20 p-1.5 border rounded-md bg-gray-50"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <span className="text-gray-600">x</span>
          <span className="font-medium">${item.price.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-800">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remove item"
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
});

const OrderSummary = ({ subtotal, shipping = 5.99, tax = 0.05 * subtotal }) => {
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        {tax > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Tax (5%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-primary-yellow text-gray-900 font-semibold py-2 rounded-lg hover:bg-primary-yellow-dark transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );
};

const EmptyBag = () => (
  <div className="text-center py-12">
    <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      Your bag is empty
    </h3>
    <p className="text-gray-600 mb-6">
      Looks like you haven't added any items yet.
    </p>
    <Link
      to="/order"
      className="bg-primary-yellow text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-primary-yellow-dark transition-colors"
    >
      Order Online
    </Link>
  </div>
);

const BagPage = () => {
  const { bag, removeFromBag, updateQuantity } = useContext(BagContext);
  const subtotal = bag.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Bag ({bag.length} {bag.length === 1 ? "item" : "items"})
        </h1>

        {bag.length === 0 ? (
          <EmptyBag />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {bag.map((item) => (
                  <BagItem
                    key={item.id}
                    item={item}
                    onRemove={removeFromBag}
                    onQuantityChange={updateQuantity}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <OrderSummary subtotal={subtotal} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(BagPage);
