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
    <div className="flex flex-col justify-center items-center content-center h-screen">
      <div className="w-[350px] rounded-3xl bg-[rgb(250,235,215)] p-10">
        <p className="text-4xl mb-5 text-center">Sign Up</p>
        <input
          type="text"
          name="name"
          onChange={handleOnChange}
          value={items.name}
          placeholder="Enter Your Name"
          className="border-none mb-3 w-full py-2 px-3 rounded-lg text-lg block shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
        />
        <input
          type="email"
          name="email"
          onChange={handleOnChange}
          value={items.email}
          placeholder="Enter Your Email"
          className="border-none mb-3 w-full py-2 px-3 rounded-lg text-lg block shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
        />
        <input
          type="password"
          name="password"
          onChange={handleOnChange}
          value={items.password}
          placeholder="Enter Your Password"
          className="border-none mb-3 w-full py-2 px-3 rounded-lg text-lg block shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
        />
        <input
          type="password"
          name="cnfPassword"
          onChange={handleOnChange}
          value={items.cnfPassword}
          placeholder="Confirm Your Password"
          className="border-none mb-8 w-full py-2 px-3 rounded-lg text-lg block shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
        />
        <button
          className="w-5/6 bg-orange-600 text-white px-3 hover:bg-yellow-500 hover:text-black border-none rounded-3xl text-xl mx-auto block p-2 font-semibold mb-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <p>
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
