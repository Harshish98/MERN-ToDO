import React, { useContext, useState } from "react";
import axios from "axios";
import { TokenContext } from "../context/TokenProvider";
import toast from "react-hot-toast";

function CreateTodo({ fetchData }) {
  const [items, setItems] = useState({
    name: "",
  });

  const { token } = useContext(TokenContext);

  const handleOnChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        const response = await axios.post(
          "https://mern-todo-server-mbg0.onrender.com/create-todo",
          items,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        fetchData();
        setItems({ name: "" });
        toast.success("Todo added successfully");
      } catch (error) {
        toast.error("Todo not added");
        console.log(error);
      }
    } else {
      console.log("Token not found");
    }
  };

  return (
    <div className="w-full flex justify-between md:justify-evenly items-center h-7 md:h-10 mb-4">
      <input
        name="name"
        value={items.name}
        placeholder="Add your task....."
        onChange={handleOnChange}
        className="block md:w-4/6 h-full text-xs md:text-base px-4 rounded-md"
      />
      <button
        className="block rounded-full bg-orange-600 text-white p-2 hover:bg-yellow-500 hover:text-black"
        onClick={handleSubmit}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-3 h-3 md:w-6 md:h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default CreateTodo;
