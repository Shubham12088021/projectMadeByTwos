import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";
import Mens from "./components/Mens";
import Womens from "./components/Womens";
import ProductDetail from "./components/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import BrandStory from "./components/BrandStory";
import SpottedSection from "./components/SpottedSection";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Categories />
              <NewArrivals />
              <SpottedSection />
              <BrandStory />
            </>
          }
        />

        <Route path="/men" element={<Mens />} />
        <Route path="/women" element={<Womens />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart/>}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
