import React, { useEffect, useState } from "react";
import "./DisplayTodos.css";
import axios from "axios";
const DisplayTodos = (props) => {
  const [subs, setSubs] = useState([]);
  var accordions = document.getElementsByClassName("accordion-content");

  useEffect(() => {
    getAllSubs();
  }, []);
  function handleClick(content) {
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
            <div className="todo-strip">
              <ul>
                <li>
                  {" "}
                  <button
                    className="accordion-todos"
                    onClick={() => handleClick(accordions[index])}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <input type="checkbox" />
                </li>
                <li>{todo.description}</li>
                <li>{todo.status}</li>
                <li>
                  <button>&times;</button>
                </li>
              </ul>
            </div>
            <div className="accordion-content">
              {subs
                .filter((sub) => sub.related_task.id === todo.id)
                .map((sub) => {
                  return (
                    <ul key={sub * 3}>
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
