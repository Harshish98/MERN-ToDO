import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CreateTodo from "./CreateTodo";
import { TokenContext } from "../context/TokenProvider";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

function Todo() {
  const [apiData, setApiData] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editedTodo, setEditedTodo] = useState({
    name: "",
  });
  const [userDetails, setUserDetails] = useState(null);

  const { token, SignOut } = useContext(TokenContext);

  let userId;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
  }

  const fetchData = async () => {
    const response = await axios.get(
      `https://mern-todo-server-mbg0.onrender.com/get-todo/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setApiData(response.data.todoDetails);
    // console.log(apiData);
  };

  const fetchUserDetails = async () => {
    const response = await axios.get(
      "https://mern-todo-server-mbg0.onrender.com/user-profile",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    console.log(response);
    setUserDetails(response.data);
    console.log(userDetails);
  };

  useEffect(() => {
    if (token && userId) {
      fetchData();
      fetchUserDetails();
    }
  }, [token, userId]);

  const EditTodo = (todo) => {
    setEditTodo(todo);
    setEditedTodo({
      name: todo.name,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEditedTodo = async () => {
    try {
      await axios.put(
        `https://mern-todo-server-mbg0.onrender.com/edit-todo/${editTodo._id}`,
        editedTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      setEditTodo(null);
      toast.success("Todo updated successfully");
    } catch (error) {
      toast.error("Todo not updated");
      console.log(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://mern-todo-server-mbg0.onrender.com/delete-todo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApiData(apiData.filter((item) => item._id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Todo not deleted");
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="w-[450px] h-[500px] mx-auto bg-[rgb(250,235,215)] py-4">
        <h1 className="font-bold text-4xl text-center bg-[rgb(230,99,99)] my-4">
          ToDo List
        </h1>
        <div className="absolute top-1 right-60">
          {userDetails && (
            <>
              <p className="text-white">Name: {userDetails.name}</p>
              <p className="text-white">Email: {userDetails.email}</p>
            </>
          )}
          <button
            onClick={SignOut}
            className="rounded-md text-lg bg-orange-600 text-white px-6 py-1 pb-1 hover:bg-yellow-500 hover:text-black"
          >
            Sign Out
          </button>
        </div>

        <div className="">
          <CreateTodo fetchData={fetchData} />
          <>
            {apiData.length === 0 ? (
              <p className="text-center text-red-500">
                No tasks found. Add a new task to get started.
              </p>
            ) : (
              apiData.map((val, index) => (
                <div
                  key={index}
                  className="w-full flex justify-evenly items-center"
                >
                  {editTodo === val ? (
                    <div className="w-full flex justify-evenly items-center">
                      <input
                        type="text"
                        name="name"
                        value={editedTodo.name}
                        onChange={handleEditChange}
                        className="bg-transparent border-b-[#00008b] border-b-2 hover:focus:active:outline-none text-[#00008b] font-semibold text-lg block w-4/6"
                      />
                      <div className="space-x-2">
                        <button
                          onClick={handleSaveEditedTodo}
                          className="text-blue-800"
                          title="Save"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5 pt-[2px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => setEditTodo(null)}
                          className="text-red-800"
                          title="Cancel"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5 pt-[2px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-[#00008b] w-4/6 px-1 font-semibold text-lg capitalize mb-2">
                        {val.name}
                      </p>
                      <div className="space-x-2">
                        <button
                          onClick={() => EditTodo(val)}
                          className="text-blue-500"
                          title="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5 pt-[3px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(val._id)}
                          className="text-red-500"
                          title="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5 pt-[3px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </>
        </div>
      </div>
    </div>
  );
}
export default Todo;
