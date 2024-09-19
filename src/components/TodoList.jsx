import { Button, FloatingLabel, Form } from "react-bootstrap/";
import { useState } from "react";
import { FilterTodos, SortControl } from './FilterTodos'; // Importér din nye FilterTodos-komponent
import ShowProgress from './ShowProgress'

export default function TodoList() {
  const initialTodos = [
    { id: crypto.randomUUID(), title: 'Vaske tøj', completed: false, priority: 'low' },
    { id: crypto.randomUUID(), title: 'Skifte sengetøj', completed: false, priority: 'medium' },
    { id: crypto.randomUUID(), title: 'Handle ind', completed: false, priority: 'high' },
    { id: crypto.randomUUID(), title: 'Lave mad', completed: false, priority: 'low' },
    { id: crypto.randomUUID(), title: 'Træne', completed: false, priority: 'high' },
  ];

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("low"); 
  const [newTodo, setNewTodo] = useState(initialTodos);
  const [sortCriteria, setSortCriteria] = useState(''); // Manage sort criteria
  const [ascending, setAscending] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() === "") return; 

    setNewTodo((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(), 
        title: task,
        completed: false,
        priority: priority, 
      },
    ]);

    setTask("");
    setPriority("low"); 
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
    setNewTodo((prevTodos) => prevTodos.filter((todoItem) => !todoItem.completed));
  };

  return (
    <div className="col-6 m-auto my-2">
      <form onSubmit={handleSubmit}>
        <FloatingLabel label="Enter task:" className="d-flex gap-2 my-4">
          <Form.Control
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{ flex: "3" }} 
          />
          <Form.Select
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            style={{ flex: "1" }} 
          >
            <option value="low">Lav</option>
            <option value="medium">Mellem</option>
            <option value="high">Høj</option>
          </Form.Select>
        </FloatingLabel>
        <div>
          <ShowProgress todos={newTodo} /> 
        </div>
        <div className="d-flex gap-2">
          <Button onClick={handleDelete} className="mb-2" size="sm" variant="outline-danger">
            Slet færdige
          </Button>
          <Button onClick={handleCompleteAll} className="mb-2" size="sm" variant="outline-primary">
            Markér alle
          </Button>
          <SortControl onSortChange={(sortBy, ascending) => {
              setSortCriteria(sortBy);
              setAscending(ascending);
            }} />
        </div>
        
        <FilterTodos 
        todos={newTodo} 
        sortCriteria={sortCriteria} 
        ascending={ascending}
        onComplete={handleComplete}
        />
      </form>
    </div>
  );
}
