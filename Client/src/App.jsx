import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import {  MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { TiArrowBack } from "react-icons/ti";

const App = () => {
  const [edit, setEdit] = useState(false)
 const [updateData ,setUpdateData] = useState(" ")
  const [tasks, setTasks] = useState(" ");
  const [allTask, setAllTask] = useState([]);
    const [id, setId] = useState("");
  const handleSubmit = async () => {
    // info:FetchApi Add new task to the database
    // const response = await fetch("http://localhost:3000/user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: tasks }),
    // });
    // console.log(response)

    //   axios
    //     .post("http://localhost:3000/user", {
    //       name: tasks,
    //     })
    //     .then((data) => {
    //       console.log(data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    axios
      .post("http://localhost:3000/user", {
        name: tasks,
      })
      
      .then((data) => {
        console.log(data);
        setTasks()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getAllTasks = () => {
  //   axios
  //     .get("http://localhost:3000/allUser")
  //     .then((data) => {
  //       setAllTask(data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // async function getAllTasks() {
  //   try {
  //     const allData = await axios.get("http://localhost:3000/allUser");
  //     setAllTask(allData.data.Data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function getAllTasks() {
    try {
      const allData = await axios.get("http://localhost:3000/allUser");
      setAllTask(allData.data.Data);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getAllTasks();
  }, [allTask]);

  // delete data
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/delete/user/${id}`)
      .then((data) => {
        console.log(data);
        alert("Are you sure you want to delete")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = (id) => {
    setId(id)
    setEdit(true);
  };
  const handleUpdateTodo = (e) => {
  setUpdateData(e.target.value)
}
  
  const handleUpdate =  async() => {
    try {
      await axios.patch(`http://localhost:3000/update/user/${id}`, {
        name: updateData,
      });
      setEdit(false)
      getAllTasks()
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <div className="relative max-w-md mx-auto mt-16 overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="px-4 py-2 text-center">
          <h1 className="text-2xl font-bold text-gray-800 uppercase">
            To-Do List
          </h1>
        </div>
        <form className="w-full max-w-sm px-4 py-2 mx-auto">
          <div className="flex items-center py-2 border-b-2 border-teal-500">
            <input
              onChange={(e) => {
                setTasks(e.target.value);
              }}
              className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
              type="text"
              placeholder="Add a task"
            />
            <button
              onClick={handleSubmit}
              className="flex-shrink-0 px-2 py-1 text-sm text-white bg-teal-500 border-4 border-teal-500 rounded hover:bg-teal-700 hover:border-teal-700"
              type="button"
            >
              Add
            </button>
          </div>
        </form>
        {allTask.map((item) => (
          <ul className="px-4 divide-y divide-gray-200">
            <li className="py-4">
              <div className="flex items-center justify-between">
                <label htmlFor="todo1" className="block ml-3 text-gray-900">
                  <span className="text-lg font-medium">{item.name}</span>
                </label>
                <div className="flex items-center gap-5">
                  <FaRegEdit
                    onClick={() => handleEdit(item._id)}
                    className="px-1 py-1 duration-100 rounded-lg cursor-pointer hover:bg-green-500 hover:text-white"
                    size={30}
                  />
                  <MdDelete
                    onClick={() => handleDelete(item._id)}
                    className="px-1 py-1 duration-100 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
                    size={30}
                  />
                </div>
              </div>
              <hr  className="w-[400px] mt-2 bg-red-500"/>
            </li>
          </ul>
        ))}
        {edit && (
          <div>
            <div className="  items-center w-[400px] py-5 border border-black bg-white text-black rounded-md absolute top-0 left-2/4 translate-x-[-50%]">
              <h1 className="text-2xl font-bold text-center text-gray-800 uppercase">
                Update Todo
              </h1>
              <div className="flex gap-4 mt-2 ml-10">
                <input
                  onChange={handleUpdateTodo}
                  type="text"
                  placeholder="Update your data..."
                  value={allTask.name}
                  className="px-3 border border-b outline-none"
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleUpdate}
                    className="p-2 bg-green-600 rounded-full "
                  >
                    <GrUpdate className="text-white" />
                  </button>
                  <button
                    onClick={() => setEdit(false)}
                    className="p-2 bg-red-600 rounded-full "
                  >
                    <TiArrowBack className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
