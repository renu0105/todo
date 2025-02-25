import React, { useEffect } from "react";
import { useState } from "react";

function Home() {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [notesItem, setNotesItem] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const getData = () => {
      let data = localStorage.getItem("notes");
      setNotesItem(data ? JSON.parse(data) : []); // Safely parse data if available
    };
    getData();
  }, []); // Run only once when the component mounts

  const handleChange = (e) => {
    let name = e.target.name;
    if (name === "title") {
      setTitle(e.target.value);
    } else {
      setTask(e.target.value);
    }
  };

  const handleAdd = () => {
    if (!title && !task) {
      return alert("Please enter proper todo");
    }
    let prevNote = notesItem;
    let notes = [{ title, task }];
    let newNote;
    if (prevNote) {
      newNote = [...prevNote, ...notes];
    } else {
      newNote = notes;
    }

    localStorage.setItem("notes", JSON.stringify(newNote));
    setNotesItem(newNote);
    setTitle("");
    setTask("");
  };

  const handleDelete = (i) => {
    const updatedNotes = [...notesItem];
    updatedNotes.splice(i, 1);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotesItem(updatedNotes);
  };

  const editTask = () => {
    const updatedNotes = [...notesItem];
    let editable = updatedNotes[editIndex];
    editable.title = title;
    editable.task = task;
    updatedNotes[editIndex] = editable;
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setTitle("");
    setTask("");
    setEditIndex(null);
    setIsEdit(false);
  };

  const handleEdit = (i) => {
    setIsEdit(true);
    setTitle(notesItem[i].title);
    setTask(notesItem[i].task);
    setEditIndex(i);
  };

  return (
    <div className=" bg-pink-200 min-h-screen w-full flex flex-col items-center">
      <h1 className="text-5xl font-bold text-pink-700 ">Todo-app</h1>
      <div className="flex gap-7 my-7 flex-wrap ">
        <input
          type="text"
          placeholder="add title..."
          className="p-3 text-lg "
          name="title"
          onChange={handleChange}
          value={title}
        />
        <input
          type="text"
          placeholder="add tasks to do..."
          className="p-3 text-lg "
          name="task"
          onChange={handleChange}
          value={task}
        />
        <button
          className="text-white bg-pink-900 p-3 text-lg ron"
          onClick={() => {
            if (isEdit) {
              editTask();
            } else {
              handleAdd();
            }
          }}
        >
          {isEdit ? "Update Task" : "Add task"}
        </button>
      </div>
      <div className="w-full px-4">
        <p className="text-xl font-bold text-red-800 px-5 py-2 ">Your Tasks</p>
        {notesItem.length < 1
          ? "Nothing to show! Use Add a Note section above to add a Note. "
          : notesItem.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-2 py-2 px-5 w-screen flex-wrap"
              >
                <div>
                  <h1 className="font-semibold text-xl">{item.title}</h1>
                  <p>{item.task}</p>
                </div>
                <div>
                  <button
                    className="bg-red-500 text-white rounded-md m-2 p-2"
                    onClick={() => handleDelete(i)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 text-white rounded-md m-2 p-2"
                    onClick={() => handleEdit(i)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Home;
