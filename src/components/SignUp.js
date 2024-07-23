import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [items, setItems] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mern-todo-server-mbg0.onrender.com/user-signup",
        items,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toast.success("Sign up success", {
          duration: 3000,
        });
        navigate("/");
      } else {
        toast.error("Sign up error", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center content-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm md:max-w-md rounded-3xl bg-[rgb(250,235,215)] p-6 sm:p-8 md:p-10 shadow-md">
        <p className="text-2xl sm:text-3xl md:text-4xl mb-5 text-center">
          Sign Up
        </p>
        <input
          type="text"
          name="name"
          onChange={handleOnChange}
          value={items.name}
          placeholder="Enter Your Name"
          className="border-none mb-3 w-full py-2 px-3 rounded-lg text-lg block shadow-md"
        />
        <input
          type="email"
          name="email"
          onChange={handleOnChange}
          value={items.email}
          placeholder="Enter Your Email"
          className="border-none mb-3 w-full py-2 px-3 rounded-lg text-lg block shadow-md"
        />
        <input
          type="password"
          name="password"
          onChange={handleOnChange}
          value={items.password}
          placeholder="Enter Your Password"
          className="border-none mb-3 w-full py-2 px-3 rounded-lg text-lg block shadow-md"
        />
        <input
          type="password"
          name="cnfPassword"
          onChange={handleOnChange}
          value={items.cnfPassword}
          placeholder="Confirm Your Password"
          className="border-none mb-8 w-full py-2 px-3 rounded-lg text-lg block shadow-md"
        />
        <button
          className="w-full bg-orange-600 text-white px-3 hover:bg-yellow-500 hover:text-black border-none rounded-3xl text-xl mx-auto block p-2 font-semibold mb-4 shadow-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <p className="text-center">
          Already have an account?
          <Link to="/">
            <span className="text-[#38668c] text-xs font-semibold">
              {" "}
              Sign In here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
