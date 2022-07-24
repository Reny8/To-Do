import React, { useState } from "react";
import axios from "axios";
import "./AddTodos.css"
const AddTodos = (props) => {
  const [newItem, setNewItem] = useState({
    description: "",
    status: "Not Started",
  });
  async function createTodo(body) {
    try {
      await axios.post("http://127.0.0.1:8000/tasks/", body);
      props.getAllTodos()
      setNewItem({...newItem, description:""})
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="around-add">
      <input className="add"
        value={newItem.description}
        type="text"
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
      />
      <button className="add-button" onClick={() => createTodo(newItem)}>ADD</button>
    </div>
  );
};

export default AddTodos;
