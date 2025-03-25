import React, { useState, useEffect } from "react"; 
import axios from "axios";

const ProductModal = ({ product, onClose, id }) => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateLocalStorageCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const addToCart = async () => {
    if (!id) {
      console.error("User ID is missing! Saving to localStorage instead.");
      const existingProduct = cart.find((item) => item.id === product.id);

      let updatedCart;
      if (existingProduct) {
        existingProduct.quantity += quantity;
        updatedCart = [...cart];
      } else {
        updatedCart = [...cart, { ...product, quantity }];
      }

      updateLocalStorageCart(updatedCart);
      console.log("Cart updated in localStorage:", updatedCart);
      return;
    }

    
    try {
      const userResponse = await axios.get(`http://localhost:3001/users/${id}`);
      const user = userResponse.data;

      const existingProduct = user.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        user.cart.push({ ...product, quantity });
      }

      await axios.patch(`http://localhost:3001/users/${id}`, { cart: user.cart });

      console.log("Product added to cart via API:", product);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl relative">
        <button
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-56 object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 font-bold">
            ${product.price}
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <div className="flex text-yellow-400 mb-3">
            ★★★★★ <span className="text-gray-500 text-sm ml-1">(4.9)</span>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center mb-4">
            <button 
              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
              onClick={decrementQuantity}
            >
              -
            </button>
            <span className="mx-3">{quantity}</span>
            <button 
              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
              onClick={incrementQuantity}
            >
              +
            </button>
            <span className="ml-auto text-green-500">In stock</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={addToCart}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border text-red-500 hover:bg-red-50 transition-colors">
              ♥
            </button>
          </div>
          
          <div className="mt-4 border-t pt-4">
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;