import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import {
  Header,
  Footer,
  About,
  ComponentLoader,
  ScrollToTop,
  Menu,
} from "./components";
import { Home, Reservations, LoginPage, OrderOnline, BagPage } from "./pages";
import { BagProvider } from "./components/BagContext";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BagProvider>
        <Header />

        <Suspense fallback={<ComponentLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/order" element={<OrderOnline />} />
            <Route path="/bag" element={<BagPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </BagProvider>
    </BrowserRouter>
  );
}

export default App;
