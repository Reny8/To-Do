import React, { useState } from "react";
import axios from "axios";
const AddTodos = (props) => {
  const [newItem, setNewItem] = useState({
    description: "",
    status: "Not Started",
  });
  async function createTodo(body) {
    try {
      await axios.post("http://127.0.0.1:8000/tasks/", body);
      props.getAllTodos()
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
      <input
        value={newItem.description}
        type="text"
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
      />
      <button onClick={() => createTodo(newItem)}>Add</button>
    </div>
  );
};

export default AddTodos;
