import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayTodos from "./components/DisplayTodos/DisplayTodos";
import Logo from "./logo.png";
function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getAllTodos();
  }, []);
  async function getAllTodos() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/tasks/");
      setTodos(response.data);
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="App">
      <div className="title">
        <img src={Logo} alt="logo" />
        <h1>Do To App</h1>
      </div>
      <DisplayTodos todos={todos} />
    </div>
  );
}

export default App;
