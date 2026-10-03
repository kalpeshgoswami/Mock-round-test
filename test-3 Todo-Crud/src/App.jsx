
import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";
import "./components/style.css"

const App = () => {
  const initialTodos = [
    {
      id: 1,
      Task: "Learn",
      Description: "You have to learn new things daily",
      completed: true
    },
    {
      id: 2,
      Task: "Reading",
      Description: "You have to read a book for 30 minutes every day",
      completed: true
    }
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [EditVal, setEditVal] = useState(null);

  const handleAdd = (input) => {
    if (!input.Task || !input.Description) {
      alert("Task data are required");
      return;
    }

    if (EditVal) {
      setTodos((todos) =>
        todos.map((t) =>
          t.id === EditVal.id
            ? {
              ...t,
              Task: input.Task,
              Description: input.Description,
            }
            : t
        )
      );

      setEditVal(null);
      alert("Task updated successfully");
    }

    else {
      const newTodo = {
        id: new Date().getTime(),
        Task: input.Task,
        Description: input.Description,
      };

      setTodos((pre) => [...pre, newTodo]);

      alert("Task added successfully");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEdit = (id) => {
    const todo = todos.find((t) => t.id === id);
    setEditVal(todo);
  };

  const handleCheck = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
            ...t,
            completed: !t.completed
          }
          : t
      )
    )
  }

  const allTasks = todos.length;

  const completedTasks = todos.filter(
    (todo) => todo.completed
  ).length;

  const pendingTasks = todos.filter(
    (todo) => !todo.completed
  ).length;

  return (
    <>

      <h1 className="Todo">Todo Crud</h1>



      <div className="dashboard">

        <div className="card">
          <h3>All Tasks</h3>
          <h1>{allTasks}</h1>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <h1>{pendingTasks}</h1>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <h1>{completedTasks}</h1>
        </div>



      </div>
      <AddTodo addTodo={handleAdd} EditVal={EditVal} />
      <br />
      <ListTodo
        todos={todos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCheck={handleCheck}
      />
    </>
  );
};

export default App;