import React, { useEffect, useState } from "react";
import "./DisplayTodos.css";
import axios from "axios";
const DisplayTodos = (props) => {
  const [subs, setSubs] = useState([]);
  var accordions = document.getElementsByClassName("accordion-todos");

  useEffect(() => {
    getAllSubs();
  }, []);
  function handleClick(current) {
    var content = current.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
  async function getAllSubs() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/subs/");
      setSubs(response.data);
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="container">
      {props.todos.map((todo, index) => {
        return (
          <div key={todo.id * 2}>
            <button
              className="accordion-todos"
              onClick={() => handleClick(accordions[index])}
            >
              {" "}
              <ul>
                <li>
                  <input type="checkbox" />
                </li>
                <li>{todo.description}</li>
                <li>{todo.status}</li>
                <li>
                  <button>&times;</button>
                </li>
              </ul>
            </button>
            <div className="accordion-content">
              {subs
                .filter((sub) => sub.related_task.id === todo.id)
                .map((sub) => {
                  return (
                      <ul className="around-subs" key={sub * 3}>
                        <li>
                          <input type="checkbox" />
                        </li>
                        <li>{sub.description}</li>
                        <li>{sub.status}</li>
                        <li>
                          <button>&times;</button>
                        </li>
                      </ul>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayTodos;
