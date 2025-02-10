// share the bag state between components
import React, { createContext, useState } from "react";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bag, setBag] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  // update total item count whenever Bag changes (displayed in the header)
  const updateItemCount = (newBag) => {
    const count = newBag.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  };

  // prevBag is the previous state of the entire shopping bag array
  // newBag is the updated state of the entire shopping bag array
  const addToBag = (item) => {
    setBag((prevBag) => {
      const existingItem = prevBag.find((bagItem) => bagItem.id === item.id);
      let newBag;

      // Update quantity if item exists
      if (existingItem) {
        newBag = prevBag.map((bagItem) =>
          bagItem.id === item.id
            ? { ...bagItem, quantity: item.quantity }
            : bagItem
        );
      } else {
        newBag = [...prevBag, item]; // Add new item if it doesn't exist
      }

      updateItemCount(newBag);
      return newBag;
    });
  };

  // Function to update quantity of a specific item in the bag
  const updateQuantity = (itemId, newQuantity) => {
    setBag((prevBag) => {
      const newBag = prevBag.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      updateItemCount(newBag); // updates the total item count in the header
      return newBag;
    });
  };

  // removes Items from the bag
  const removeFromBag = (itemId) => {
    setBag((prevBag) => {
      const newBag = prevBag.filter((item) => item.id !== itemId);
      updateItemCount(newBag);
      return newBag;
    });
  };

  return (
    <BagContext.Provider
      value={{ bag, addToBag, removeFromBag, updateQuantity, itemCount }}
    >
      {children}
    </BagContext.Provider>
  );
};
