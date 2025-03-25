import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    payment: 'card'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    console.log(cartItems)
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    localStorage.setItem('cart', JSON.stringify([]));
    setCartItems([]);
    toast.success("Order Placed Successfully");
    
    setTimeout(() => {
      navigate('/cart');
    }, 2500);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <div className="text-center py-4">
            <p className="mb-4">Your cart is empty</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-medium mb-4">Shipping & Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="address" className="block mb-1 font-medium">Delivery Address</label>
              <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-2 border rounded" rows="3" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Payment Method</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" id="card" name="payment" value="card" checked={formData.payment === 'card'} onChange={handleInputChange} className="mr-2" />
                  <label htmlFor="card">Credit/Debit Card</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="paypal" name="payment" value="paypal" checked={formData.payment === 'paypal'} onChange={handleInputChange} className="mr-2" />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 pt-4">
              <button type="button" onClick={() => navigate('/cart')} className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                Back to Cart
              </button>
              <button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                Place Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Checkout;
