import React from "react";
import "./DisplayTodos.css";
const DisplayTodos = (props) => {
  return (
    <div className="around-table">
      <table className="table">
        <tbody>
          {props.todos.map((item) => {
            return (
              <tr scope="row" key={item.id * 2}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.description}</td>
                <td>{item.status}</td>
                <td className="around-delete">
                  <button>&times;</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTodos;
