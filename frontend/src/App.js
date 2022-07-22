import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Products/Products";
import Search from "./components/Search/Search";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/UserAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/UserOptions/UserOptions";
import Profile from "./components/Profile/Profile";
import ForgotPassword from "./components/ForrgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdatePassword from "./components/UpdatePaassword/UpdatePassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Shipping/Shipping";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder";
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/Payment/Payment";

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
    console.log(stripeApiKey);
  }, []);
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Router>
            <Navbar />
            {isAuthenticated && <UserOptions user={user} />}
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/product/:id" element={<ProductDetails />} />
              <Route exact path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/auth" element={<LoginSignup />} />
              <Route exact path="/account" element={<Profile />} />
              <Route
                exact
                path="/password/forgot"
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/password/reset/:token"
                element={<ResetPassword />}
              />

              <Route exact path="/cart" element={<Cart />} />

              <Route exact path="/shipping" element={<Shipping />} />

              <Route exact path="/order/confirm" element={<ConfirmOrder />} />

              {stripeApiKey && (
                <Route
                  path="/process/payment"
                  element={
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  }
                />
              )}

              <Route exact path="/success" element={<OrderSuccess />} />
            </Routes>
            <Footer />
          </Router>
        </>
      )}
    </>
  );
}

export default App;
