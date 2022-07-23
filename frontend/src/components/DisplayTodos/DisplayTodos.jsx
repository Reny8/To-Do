import React, { useState } from "react";
import "./DisplayTodos.css"
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Table, TableCell, TableRow } from "@mui/material";
const DisplayTodos = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="todo-list">
      <Table aria-lable="collapsible table">
      
          {props.todos.map((todo) => {
            return (  
            <TableRow>
                <TableCell>
                  {" "}
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell><input type="checkbox"/></TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>{todo.status}</TableCell>
                <TableCell className="button"><button>&times;</button></TableCell>
              </TableRow>
            );
          })}
      
      </Table>
    </div>
  );
};

export default DisplayTodos;
