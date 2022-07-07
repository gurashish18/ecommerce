import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Products/Products";
import Search from "./components/Search/Search";
import LoginSignup from "./components/LoginSignup/LoginSignup";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/auth" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
