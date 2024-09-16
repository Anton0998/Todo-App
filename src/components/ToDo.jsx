import { Button, FloatingLabel, Form, ListGroup } from "react-bootstrap/";
import { useState } from "react";

export default function ToDo() {
  const [task, setTask] = useState("");
  const [newTodo, setNewTodo] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewTodo((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(), // Generer et unikt id for hver opgave
        title: task,
        completed: false, 
      },
    ]);

    if (setTask === '') {
      return null
    }

    setTask("");
  };

  const handleComplete = (id) => {
    setNewTodo((prevTodos) =>
      prevTodos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, completed: !todoItem.completed } : todoItem
      )
    );
  };

  const handleCompleteAll = () => {
    setNewTodo((prevTodos) =>
      prevTodos.map((todoItem) => ({
        ...todoItem,
        completed: true
      }))
    );
  };

  const handleDelete = () => {
    setNewTodo(prevTodo => prevTodo.filter((todoItem) => !todoItem.completed))
  }

  return (
    <div className="col-6 m-auto my-3">
      <form onSubmit={handleSubmit}>
        <FloatingLabel label="Enter task:" className="d-flex gap-2 my-5">
          <Form.Control
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </FloatingLabel>
        <div className="d-flex gap-2">
          <Button onClick={handleDelete} className="mb-2" size='sm' variant="outline-danger">Slet færdige</Button>  
          <Button onClick={handleCompleteAll} className="mb-2" size='sm' variant="outline-primary">markér alle</Button>  
        </div>
    
        <ListGroup>
          {newTodo.map((todoItem) => (
            <ListGroup.Item
              className='d-flex gap-2 align-items-center'
              key={todoItem.id}
              style={{
                textDecoration: todoItem.completed ? "line-through" : "none",
                opacity: todoItem.completed ? 0.5 : 1, 
                cursor: 'pointer',
              }}
              onClick={() => handleComplete(todoItem.id)}
            >
              <Form.Check
                type="checkbox"
                checked={todoItem.completed} 
              />
              {todoItem.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </form>
    </div>
  );
}
