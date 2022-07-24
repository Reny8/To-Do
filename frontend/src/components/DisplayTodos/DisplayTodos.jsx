import React, { useEffect, useState } from "react";
import "./DisplayTodos.css";
import "../../App.css";
import axios from "axios";
const DisplayTodos = (props) => {
  const [subs, setSubs] = useState([]);
  var accordions = document.getElementsByClassName("collapse");
  useEffect(() => {
    getAllSubs();
  }, []);
  function handleClick(content) {
    try {
      if (content.className === "collapse") {
        content.className = "collapse show";
      } else {
        content.className = "collapse";
      }
    } catch (error) {
      alert("No current sub-tasks for this to-do");
    }
  }

  async function addSubTask(todoId) {
    try {
      let input = prompt("Enter the sub-task description");
      let newSub = {
        related_task_id: todoId,
        description: input,
        status: "Not Started",
      };
      await axios.post("http://127.0.0.1:8000/subs/", newSub);
      props.getAllTodos()
      getAllSubs()
    } catch (error) {
      console.log(error.message);
    }
  }
  async function deleteSub(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/subs/${id}/`)
      props.getAllTodos()
      getAllSubs()
    } catch (error) {
      alert(error.message)
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
  async function deleteTask(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/${id}/`)
      props.getAllTodos()
      getAllSubs()
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <div id="accordion">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.todos.map((todo, index) => {
            return (
              <>
                <tr key={todo.id * 2} className="todo-strip">
                  <td style={{ width: 16 }}>
                    {" "}
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
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
                  </td>
                  <td style={{ width: 0 }}>
                    <input type="checkbox" />
                  </td>
                  <td>{todo.description}</td>
                  <td style={{ width: 0 }}>
                    <button onClick={() => addSubTask(todo.id)}>+</button>
                  </td>
                  <td style={{ width: 0 }}>
                    <button onClick={()=>deleteTask(todo.id)}>&times;</button>
                  </td>
                </tr>
                {subs &&
                  subs
                    .filter((sub) => sub.related_task.id === todo.id)
                    .map((sub) => {
                      if (sub) {
                        return (
                          <tr
                            className="collapse"
                            key={sub.id}
                            data-parent="#accordion"
                          >
                            <td></td>
                            <td>
                              <input type="checkbox" />
                            </td>
                            <td>{sub.description}</td>
                            <td></td>
                            <td style={{ width: 0 }}>
                              <button onClick={()=> deleteSub(sub.id)}>&times;</button>
                            </td>
                          </tr>
                        );
                      }
                    })}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTodos;
