
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import "./style.css"

const AddTodo = ({ addTodo, EditVal }) => {
  const [input, setInput] = useState({
    Task: "",
    Description: "",
  });

  useEffect(() => {
    if (EditVal) {
    }
  }, [EditVal]);

  const handleChange = (field, e) => {
    setInput((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo(input);

    setInput({
      Task: "",
      Description: "",
    });
  };

  return (
    <>

      <form onSubmit={handleSubmit} className="inputForm">
        <h1 className="Todo">Todo Crud</h1>
        <input className="input"
          type="text"
          placeholder="Enter your Task"
          value={input.Task}
          onChange={(e) => handleChange("Task", e)}
        />

        <input
          className="input"
          type="text"
          placeholder="Enter your Description"
          value={input.Description}
          onChange={(e) => handleChange("Description", e)}
        />

        <Button type="submit" variant="outline-primary">
          {EditVal ? "Update" : "Submit"}
        </Button>

      </form>
    </>
  );
};

export default AddTodo;