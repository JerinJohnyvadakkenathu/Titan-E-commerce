import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function Login() {
  const navigate = useNavigate();
  

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    }, 
    onSubmit: async (values) => {
      try {
        const res = await axios.get('http://localhost:3001/users');
        const users = res.data;

        const user = users.find(
          (u) =>
            u.userName === values.userName &&
            u.password === values.password
            
        );
        console.log(users)
        

        if (user) {
          localStorage.setItem("user", JSON.stringify(user)); 
          toast.success("Login Successful 😁");
          setTimeout(() => {
            navigate("/home");
          }, 2500);
        } else {
          toast.error("Check your details and try again");
        }
        
      } catch (err) {
        console.log(err);
        toast.error('Failed to fetch user data');
      }
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col bg-white p-6 rounded-lg shadow-lg gap-4 w-96"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-4">
          Login
        </h2>

        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-medium text-black">
            Enter your Username
          </label>
          <input
            className="bg-amber-500 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-400"
            type="text"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium text-black">
            Enter your Password
          </label>
          <input
            className="bg-amber-500 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-400"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>

      <button
        onClick={() => navigate('/Register')}
        className="mt-4 bg-gray-200 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
      >
        New? Create an account
      </button>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
}

export default Login;
