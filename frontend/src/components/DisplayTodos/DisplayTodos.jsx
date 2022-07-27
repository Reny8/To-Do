import React, { useEffect, useState } from "react";
import "./DisplayTodos.css";
import "../../App.css";
import axios from "axios";
const DisplayTodos = (props) => {
  const [subs, setSubs] = useState([]);
  var accordions = document.getElementsByClassName("collapse");
  var todoText = document.getElementsByClassName("text");
  var subText = document.getElementsByClassName("sub-text");
  useEffect(() => {
    getAllSubs();
  }, []);

  // ACCORDION FUNCTIONALITY
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

  // EDIT TODOS
  async function editTodo(id) {
    try {
      let input = prompt("Enter changes below");
      let update = {
        description: input,
        status: "Not Started",
      };
      await axios.put(`http://127.0.0.1:8000/tasks/${id}/`, update);
      props.getAllTodos();
      getAllSubs();
    } catch (error) {
      alert(error.message);
    }
  }

  // EDIT SUB-TASK
  async function editSub(sub_id, related_todo_id) {
    try {
      let input = prompt("Enter changes below:");
      let updateSub = {
        related_task_id: related_todo_id,
        description: input,
        status: "Not Started",
      };
      await axios.put(`http://127.0.0.1:8000/subs/${sub_id}/`, updateSub);
      props.getAllTodos()
      getAllSubs()
    } catch (error) {
      alert(error.message);
    }
  }

  //ADD SUB-TASKS TO THE TO DO
  async function addSubTask(todoId) {
    try {
      let input = prompt("Enter the sub-task description");
      let newSub = {
        related_task_id: todoId,
        description: input,
        status: "Not Started",
      };
      await axios.post("http://127.0.0.1:8000/subs/", newSub);
      props.getAllTodos();
      getAllSubs();
    } catch (error) {
      console.log(error.message);
    }
  }

  //DELETE A SUB-TASK
  async function deleteSub(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/subs/${id}/`);
      props.getAllTodos();
      getAllSubs();
    } catch (error) {
      alert(error.message);
    }
  }

  //GET ALL SUBS
  async function getAllSubs() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/subs/");
      setSubs(response.data);
    } catch (error) {
      alert(error.message);
    }
  }

  //DELETE A TO DO
  async function deleteTask(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/${id}/`);
      props.getAllTodos();
      getAllSubs();
    } catch (error) {
      alert(error.message);
    }
  }

  //CROSS OUT TEXT WHEN CHECKBOX IS CLICKED
  function changeText(td) {
    if (td.style.textDecoration) {
      td.style.textDecoration = null;
    } else {
      td.style.textDecoration = "line-through" + "#23A638";
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
                    <input
                      onClick={() => {
                        changeText(todoText[index]);
                      }}
                      type="checkbox"
                    />
                  </td>
                  <td className="text">{todo.description}</td>
                  <td style={{ width: 0 }}>
                    <button onClick={() => editTodo(todo.id)}>EDIT</button>
                  </td>
                  <td style={{ width: 0 }}>
                    <button onClick={() => addSubTask(todo.id)}>+</button>
                  </td>
                  <td style={{ width: 0 }}>
                    <button onClick={() => deleteTask(todo.id)}>&times;</button>
                  </td>
                </tr>
                {subs &&
                  subs
                    .filter((sub) => sub.related_task.id === todo.id)
                    .map((sub, found) => {
                      if (sub) {
                        return (
                          <tr
                            className="collapse show"
                            key={sub.id}
                            data-parent="#accordion"
                          >
                            <td></td>
                            <td>
                              <label>
                                <input
                                  onClick={() => {
                                    changeText(subText[found]);
                                  }}
                                  type="checkbox"
                                />
                              </label>
                            </td>
                            <td className="sub-text">{sub.description}</td>
                            <td style={{ width: 0 }}>
                              <button onClick={() => editSub(sub.id, todo.id)}>EDIT</button>
                            </td>
                            <td style={{ width: 0 }}>
                              <button onClick={() => deleteSub(sub.id)}>
                                &times;
                              </button>
                            </td>{" "}
                            <td></td>
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
