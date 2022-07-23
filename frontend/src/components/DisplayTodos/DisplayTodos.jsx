import React, { useEffect, useState } from "react";
import "./DisplayTodos.css";
import axios from "axios";
const DisplayTodos = (props) => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    getAllSubs();
  }, []);
  async function getAllSubs() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/subs/");
      setSubs(response.data);
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="todo-list">
      <table>
        <tbody>
          {props.todos.map((todo, index) => {
            return (
              <>
                <tr key={index * 2}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{todo.description}</td>
                  <td>{todo.status}</td>
                  <td>&times;</td>
                </tr>{" "}
                {subs
                  .filter((sub) => sub.related_task.id === todo.id)
                  .map((sub) => {
                    return (
                      <tr key={sub.id * 3}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{sub.description}</td>
                        <td>{sub.status}</td>
                        <td>&times;</td>
                      </tr>
                    );
                  })}{" "}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTodos;
