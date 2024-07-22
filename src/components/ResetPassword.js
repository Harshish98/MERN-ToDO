import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://mern-todo-server-mbg0.onrender.com/reset-password/${id}/${token}`,
        { password }
      )
      .then((res) => {
        if ((res.data.Status = "Success")) {
          toast.success("Password reset successfully", {
            duration: 2000,
          });
          toast.success("Please login with new password", {
            duration: 3000,
          });
          navigate("/");
        } else {
          console.log("Error: ", res.data.Status);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-fit">
        <input
          type="password"
          name="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-none mb-3 w-full py-2 px-3 rounded-lg text-lg block shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
        />
        <button
          onClick={handleSubmit}
          className="w-5/6 bg-orange-600 text-white px-3 hover:bg-yellow-500 hover:text-black border-none rounded-3xl text-xl mx-auto block p-2 font-semibold mb-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
