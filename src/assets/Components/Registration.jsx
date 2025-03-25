import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'; 

function Registration() {
  const nav = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    userName: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
  
  const formik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      console.log("Form submitted:", values);
      
      try {
        const res = await axios.post("http://localhost:3001/users", {
          ...values,
          cart: [],
        });
        
        console.log("Response:", res.data);
        localStorage.setItem("userId", res.data.id);
        
        toast.success("Registered successfully!");
        
        
          nav('/login');
        
      } catch (err) {
        console.error("Error:", err);
       
        if (err.response) {
         
          toast.error(`Registration failed: ${err.response.data.message || 'Server error'}`);
        } else if (err.request) {
        
          toast.error("Server not responding. Check your connection.");
        } else {
          
          toast.error(`Registration failed: ${err.message}`);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
        
        <form 
          className="flex flex-col bg-white p-6 rounded-lg shadow-lg gap-5" 
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">Full Name</label>
            <input
              className="bg-white border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              name="name" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="userName" className="mb-1 font-medium text-gray-700">Username</label>
            <input
              className="bg-white border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="userName"
              name="userName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.userName}</div>
            ) : null}
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email Address</label>
            <input
              className="bg-white border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
            <input
              className="bg-white border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-600 text-white p-3 rounded-md mt-4 font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Registering...' : 'Create Account'}
          </button>
          
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => nav('/login')}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

export default Registration;