import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../context/TokenProvider";
import toast from "react-hot-toast";

function Login() {
  const [items, setItems] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { tokenLocalStorage } = useContext(TokenContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mern-todo-server-mbg0.onrender.com/user-login",
        items,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Sign in success", {
          duration: 3000,
        });
        tokenLocalStorage(response.data.token);
        navigate("/todo");
        console.log(response)
      } else {
        toast.error("Sign in error", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col justify-center items-center content-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-xs md:max-w-sm rounded-3xl bg-[rgb(250,235,215)] p-6 sm:p-8 md:p-10 shadow-md">
        <p className="text-2xl sm:text-3xl md:text-4xl mb-5 text-center">
          Sign In
        </p>
        <input
          type="email"
          name="email"
          value={items.email}
          onChange={handleOnChange}
          placeholder="Enter Email"
          className="border-none mb-3 w-full py-2 px-3 rounded-lg text-lg block shadow-md"
        />
        <input
          type="password"
          name="password"
          value={items.password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="border-none mb-3 w-full py-2 px-3 rounded-lg text-lg block shadow-md"
        />
        <Link to="/forget-password">
          <p className="mb-5 text-sm sm:text-base">Forgot password?</p>
        </Link>
        <button
          className="w-full bg-orange-600 text-white px-3 hover:bg-yellow-500 hover:text-black border-none rounded-3xl text-xl mx-auto block p-2 font-semibold mb-4 shadow-md"
          onClick={handleSubmit}
        >
          Login
        </button>
        <p className="text-center">
          Don't have an account?
          <Link to="/signup">
            <span className="text-xs font-semibold text-[#38668c]">
              {" "}
              Register here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
