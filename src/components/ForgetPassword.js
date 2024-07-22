import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://mern-todo-server-mbg0.onrender.com/forget-password", {
        email,
      })
      .then((res) => {
        console.log("Response: ", res);

        if (res.data && res.data.Status === "Success") {
          toast.success("Email send for reset password successfully", {
            duration: 3000,
          });
          navigate("/");
        } else {
          console.log("Error: response status is not success");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-fit">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-none mb-3 w-full py-2 px-3 rounded-lg text-lg block shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
        />
        <button
          onClick={handleSubmit}
          className="w-5/6 bg-orange-600 text-white px-3 hover:bg-yellow-500 hover:text-black border-none rounded-3xl text-xl mx-auto block p-2 font-semibold mb-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
