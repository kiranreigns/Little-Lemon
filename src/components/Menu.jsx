import React, { useState } from "react";

const menuData = {
  starters: [
    {
      id: 1,
      name: "Greek Salad",
      price: 12.99,
      description:
        "Fresh cucumbers, crispy lettuce, tomatoes, olives, feta cheese with our signature dressing",
    },
    {
      id: 2,
      name: "Bruschetta",
      price: 8.99,
      description:
        "Grilled bread smeared with garlic and topped with tomatoes, olive oil, salt and pepper",
    },
    {
      id: 3,
      name: "Lemon Garlic Hummus",
      price: 7.99,
      description:
        "Creamy hummus with fresh lemon, served with warm pita bread",
    },
  ],
  mains: [
    {
      id: 4,
      name: "Grilled Mediterranean Sea Bass",
      price: 28.99,
      description: "Fresh sea bass with herbs, lemon, and olive oil",
    },
    {
      id: 5,
      name: "Lemon Herb Chicken",
      price: 24.99,
      description:
        "Grilled chicken breast marinated in Mediterranean herbs and lemon",
    },
    {
      id: 6,
      name: "Vegetarian Moussaka",
      price: 22.99,
      description:
        "Layers of eggplant, potatoes, and plant-based protein in rich bechamel sauce",
    },
  ],
  desserts: [
    {
      id: 7,
      name: "Baklava",
      price: 9.99,
      description: "Flaky phyllo pastry filled with nuts and honey",
    },
    {
      id: 8,
      name: "Lemon Sorbet",
      price: 7.99,
      description: "Refreshing homemade lemon sorbet",
    },
    {
      id: 9,
      name: "Greek Yogurt with Honey",
      price: 8.99,
      description: "Creamy Greek yogurt drizzled with local honey and walnuts",
    },
  ],
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("starters");

  const categories = {
    starters: "Starters",
    mains: "Main Courses",
    desserts: "Desserts",
  };

  return (
    <main id="menu" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-highlight-dark">
          Our Menu
        </h2>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200">
            {Object.entries(categories).map(([key, value]) => (
              <button
                key={key}
                className={`px-6 py-3 text-sm font-medium transition-colors
                  ${
                    activeCategory === key
                      ? "bg-highlight-dark text-white"
                      : "text-highlight-dark hover:bg-gray-50"
                  }`}
                onClick={() => setActiveCategory(key)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {menuData[activeCategory].map((item) => (
            <div
              key={item.id}
              className="bg-highlight-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-highlight-dark">
                  {item.name}
                </h3>
                <span className="text-lg font-medium text-green-700">
                  ${item.price}
                </span>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Menu;
