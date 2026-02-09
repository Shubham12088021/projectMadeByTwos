import React from "react";
import { Routes, Route } from "react-router-dom";

/* COMPONENTS */
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
import Contact from "./components/Contact";

/* 🔔 TOASTIFY */
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />

      {/* 🔔 Toast Container (ADD ONLY ONCE) */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable={false}
        theme="dark"
        transition={Slide}          // ✅ upar se slide
        // style={{ marginTop: "80px" }} // ✅ navbar ke niche
      />

    </>
  );
}

export default App;
