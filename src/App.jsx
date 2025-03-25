import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Registration from "./assets/Components/Registration";
import Login from "./assets/Components/Login";
import Home from "./assets/Home/Home";
import ProductPage from "./assets/pages/ProductPage";
import FetchingProvider from "./assets/Components/Fetching";
import Cart from "./assets/pages/Cart";
import Checkout from "./assets/pages/Checkout";
import axios from "axios";
import SearchResults from "./assets/pages/SearchResults";

function App() {
  return (
    <FetchingProvider>
      <BrowserRouter>
        <AuthCheck />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<SearchResults/>}/>
        </Routes>
      </BrowserRouter>
    </FetchingProvider>
  );
}

function AuthCheck() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/users") 
      .then(response => {
        if (response.data.length === 0) {
          navigate("/Register");
        }
      })
      .catch(error => console.error("Error fetching user data:", error))
      .finally(() => setLoading(false));
  }, [navigate]);

  return loading ? <p>Loading...</p> : null;
}

export default App;
