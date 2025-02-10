//import React, { Suspense } from "react";
import { Hero, Specials, Testimonials, About } from "../components";

const Home = () => {
  return (
    <main className="overflow-x-hidden scroll-smooth">
      <Hero />
      <Specials />
      <Testimonials />
      <About />
    </main>
  );
};

export default Home;
