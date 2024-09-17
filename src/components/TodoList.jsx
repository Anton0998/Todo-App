import { Button, FloatingLabel, Form, ListGroup, Badge } from "react-bootstrap/";
import { useState } from "react";
import ShowProgress from './ShowProgress'
// import HandlePriority from "./HandlePriority"; 

export default function TodoList() {
  const initialTodos = [
    {id: crypto.randomUUID(), title: 'Vaske tøj', completed: false, priority: 'high'},
    {id: crypto.randomUUID(), title: 'Skifte sengetøj', completed: false, priority: 'low'},
    {id: crypto.randomUUID(), title: 'Handle ind', completed: false, priority: 'medium'},
    {id: crypto.randomUUID(), title: 'Lave mad', completed: false, priority: 'medium'},
    {id: crypto.randomUUID(), title: 'Træne', completed: false, priority: 'high'},
  ]

  const [task, setTask] = useState("");
  const [newTodo, setNewTodo] = useState(initialTodos);
  const [priority, setPriority] = useState('low')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() === '') {
      return null
    };

    setNewTodo((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(), // Generer et unikt id for hver opgave
        title: task,
        completed: false,
        priority: priority, 
      },
    ]);

    setTask('');
    setPriority('');
  };

  const handleComplete = (id) => {
    setNewTodo((prevTodos) =>
      prevTodos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, completed: !todoItem.completed } : todoItem
      )
    );
  };

  const handleCompleteAll = () => {
    const allCompleted = newTodo.every((todoItem) => todoItem.completed);
  
    setNewTodo((prevTodos) =>
      prevTodos.map((todoItem) => ({
        ...todoItem,
        completed: !allCompleted, 
      }))
    );
  };

  const handleDelete = () => {
    setNewTodo(prevTodo => prevTodo.filter((todoItem) => !todoItem.completed))
  }

  const getBadgeVariant = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="m-auto col-6">
      <form onSubmit={handleSubmit}>
        <div>
          <FloatingLabel label="Enter task:" className="d-flex gap-2 mb-6">
            <Form.Control
              style={{ flex: '3' }}
              type="text"
              placeholder="Enter task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Form.Select onSelect={e => setPriority(e.target.value)} style={{ flex: '1' }}>
              <option className='align-items-center' >Vælg prioritet</option>
              <option value="low">Lav</option>
              <option value="medium">Mellem</option>
              <option value="high">Høj</option>
            </Form.Select>
          </FloatingLabel>
        </div>
        <dir className='my-4'>
          <ShowProgress todos={newTodo} />
        </dir>
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
              <Badge bg={getBadgeVariant(todoItem.priority)}>
                  {todoItem.priority}
              </Badge>
              {todoItem.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </form>
    </div>
  );
}
