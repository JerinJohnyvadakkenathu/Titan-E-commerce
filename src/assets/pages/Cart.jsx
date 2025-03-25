import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Home/Navbar";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const nav = useNavigate();
  const userId = localStorage.getItem("userId ");
  console.log(userId)
  useEffect(() => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        const cartData = response.data.cart || [];
        setCartItems(cartData);
        localStorage.setItem("cart", JSON.stringify(cartData));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [userId]); 

 
  const addToCart = async (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    try {
      await axios.patch(`http://localhost:3001/users/${userId}`, { cart: updatedCart });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  
  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    updateCart(updatedCart);
  };

  
  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    updateCart(updatedCart);
  };

  
  const updateCart = async (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    try {
      await axios.patch(`http://localhost:3001/users/${userId}`, { cart: updatedCart });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const toProducts = () => {
    nav("/products");
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    <Navbar/>
    <div className="cart-container flex flex-col h-screen w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart flex flex-col items-center justify-center flex-grow">
          <p className="text-gray-500 mb-6 text-lg">Your cart is empty</p>
          <button
            onClick={toProducts}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg text-lg"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="cart-items flex-grow flex flex-col">
          <div className="cart-items-list flex-grow overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item flex justify-between items-center border-b py-4">
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                </div>

                <div className="flex items-center">
                  <div className="quantity-controls flex items-center mr-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-l"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total font-medium text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer mt-auto pt-4">
            <div className="cart-total flex justify-between items-center font-bold text-xl mb-6 pt-4 border-t">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => nav("/checkout")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg text-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Cart;
