import {
  greekSalad,
  bruchetta,
  lemonDessert,
  grilledFish,
  cornBreadSalad,
  chickenSalad,
  barbecuePork,
  sushi,
  italianPizza,
  fruitAppetizer,
  cookieDessert,
  berryDessert,
  cheeseBiscuit,
} from "../assets";

export const foodItems = [
  {
    id: 1,
    name: "Greek Salad",
    price: 12.99,
    image: greekSalad,
    description:
      "Fresh cucumbers, crisp lettuce, tomatoes, and olives. Topped with feta cheese and our house-made Greek dressing.",
    category: "Salads",
    dietary: ["Vegetarian", "Gluten-Free"],
    prepTime: "10-15 mins",
  },
  {
    id: 2,
    name: "Bruschetta",
    price: 8.99,
    image: bruchetta,
    description:
      "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and extra virgin olive oil.",
    category: "Appetizers",
    dietary: ["Vegetarian"],
    prepTime: "8-10 mins",
  },
  {
    id: 3,
    name: "Grilled Fish",
    price: 18.99,
    image: grilledFish,
    description:
      "Fresh catch of the day grilled to perfection with herbs, served with seasonal vegetables and lemon butter sauce.",
    category: "Main Course",
    dietary: ["Gluten-Free"],
    prepTime: "20-25 mins",
  },
  {
    id: 4,
    name: "Lemon Dessert",
    price: 9.99,
    image: lemonDessert,
    description:
      "House-made lemon cake with fresh lemon glaze, served with a dollop of vanilla cream.",
    category: "Desserts",
    dietary: ["Vegetarian"],
    prepTime: "5 mins",
  },

  {
    id: 5,
    name: "Grarden Chicken Salad",
    price: 18.0,
    image: chickenSalad,
    description:
      "Chicken grarden salad with grilled chicken, fresh vegetables, and crunchy croutons.",
    category: "Salads",
    dietary: ["Non Vegetarian"],
    prepTime: "15 mins",
  },

  {
    id: 6,
    name: "Corn Bread Salad",
    price: 8.99,
    image: cornBreadSalad,
    description:
      "Corn Bread Salad with comforting flavors. Sweet, buttery cornbread gets tossed together with tomatoes, corn, pinto beans.",
    category: "Salads",
    dietary: ["Vegetarian"],
    prepTime: "10 mins",
  },

  {
    id: 7,
    name: "Barbecue Pork Salad",
    price: 16.99,
    image: barbecuePork,
    description:
      "Barbecue Pork Salad topped with barbecue pork, cheddar cheese and creamy avocado.",
    category: "Salads",
    dietary: ["Non Vegetarian"],
    prepTime: "15 mins",
  },

  {
    id: 8,
    name: "Sushi Rolls",
    price: 12.99,
    image: sushi,
    description:
      "Sushi made with vinegared rice, combined with seafood, vegetables",
    category: "Main Course",
    dietary: ["Veg / Non Veg"],
    prepTime: "5 mins",
  },

  {
    id: 9,
    name: "Italian Pizza",
    price: 12.99,
    image: italianPizza,
    description:
      "Authentic Italian pizza with a thin, crispy crust, topped with fresh tomato sauce, mozzarella cheese, basil, and a drizzle of olive oil.",
    category: "Main Course",
    dietary: ["Vegetarian"],
    prepTime: "15 mins",
  },

  {
    id: 10,
    name: "Cheese Biscuit",
    price: 9.99,
    image: cheeseBiscuit,
    description:
      "Fluffy, buttery biscuits loaded with melted cheddar cheese, perfect as a side or snack.",
    category: "Appetizers",
    dietary: ["Vegetarian"],
    prepTime: "10 mins",
  },

  {
    id: 11,
    name: "Fruit Chart",
    price: 15.99,
    image: fruitAppetizer,
    description:
      "A colorful assortment of fresh seasonal fruits, including melon, pineapple, grapes, and berries, served with a honey-lime drizzle.",
    category: "Appetizers",
    dietary: ["Vegan", "Gluten-Free"],
    prepTime: "5 mins",
  },

  {
    id: 12,
    name: "Chocolate Cookie Dessert",
    price: 8.99,
    image: cookieDessert,
    description:
      "Warm, gooey chocolate chip cookies served with a scoop of vanilla ice cream and a drizzle of chocolate sauce.",
    category: "Desserts",
    dietary: ["Vegetarian"],
    prepTime: "8 mins",
  },

  {
    id: 13,
    name: "Berry Dessert",
    price: 10.99,
    image: berryDessert,
    description:
      "A delightful mix of fresh strawberries and blueberries, layered with whipped cream and a sprinkle of powdered sugar.",
    category: "Desserts",
    dietary: ["Vegetarian", "Gluten-Free"],
    prepTime: "5 mins",
  },
];
