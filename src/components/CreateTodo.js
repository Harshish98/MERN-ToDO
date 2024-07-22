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
    <div className="w-full flex justify-evenly items-center h-10 mb-4">
      <input
        name="name"
        value={items.name}
        placeholder="Add your task....."
        onChange={handleOnChange}
        className="block w-4/6 h-full px-4 rounded-md"
      />
      <button
        className="block text-3xl rounded-full bg-orange-600 text-white px-3 pb-1 hover:bg-yellow-500 hover:text-black"
        onClick={handleSubmit}
      >
        +
      </button>
    </div>
  );
}

export default CreateTodo;
