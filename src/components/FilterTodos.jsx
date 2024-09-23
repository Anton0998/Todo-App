import { useState } from 'react';
import { Dropdown, ListGroup, Form, Badge } from "react-bootstrap/";
import EditTodos from './EditTodos';

const priorityMap = {
    low: 1,
    medium: 2,
    high: 3,
};

const sortItems = (items, sortBy, ascending) => {
    return items.sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'priority') {
            comparison = priorityMap[a.priority] - priorityMap[b.priority];
        } else if (sortBy === 'title') {
            comparison = a.title.localeCompare(b.title)
        }
        
        return ascending ? comparison : -comparison; 
    });
};

const SortControl = ({ onSortChange, onToggleDirection }) => {
    const [sortCriteria, setSortCriteria] = useState('');
    
    const handleSortChange = (sortBy, ascending) => {
      setSortCriteria(sortBy);
      onSortChange(sortBy, ascending);
    };
  
    return (
      <Dropdown className='ms-auto'>
        <Dropdown.Toggle variant="secondary" size='sm' id="dropdown-basic">
          Sortér
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          {/* Prioritet Sortering */}
          <Dropdown.Item onClick={() => handleSortChange('priority', true)}>
            Prioritet <span className='text-secondary '>↑</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange('priority', false)}>
            Prioritet <span className='text-secondary '>↓</span>
          </Dropdown.Item>
  
          {/* Alfabetisk Sortering */}
          <Dropdown.Item onClick={() => handleSortChange('title', true)}>
            Alfabetisk <span className='text-secondary '>a-z</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange('title', false)}>
            Alfabetisk <span className='text-secondary '>z-a</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  

  function FilterTodos({ todos, handleSaveEdit, onComplete, sortCriteria, ascending }) {

    const sortedTodos = sortItems([...todos], sortCriteria, ascending);
  
    return (
      <div>
        {/* Liste over sorteret TodoItems */}
        <ListGroup>
          {sortedTodos.map((todoItem) => (
            <ListGroup.Item
              key={todoItem.id}
              className="d-flex align-items-center gap-2"
              style={{
                textDecoration: todoItem.completed ? "line-through" : "none",
                opacity: todoItem.completed ? 0.5 : 1,
                cursor: 'pointer',
              }}
              onClick={() => onComplete(todoItem.id)}
            >
              <Form.Check type="checkbox" checked={todoItem.completed} readOnly />
              <Badge
                bg={
                  todoItem.priority === 'high'
                    ? 'danger'
                    : todoItem.priority === 'medium'
                    ? 'warning'
                    : 'success'
                }
              >
                {todoItem.priority}
              </Badge>
              {todoItem.title}
              <EditTodos todoItem={todoItem} handleSaveEdit={handleSaveEdit} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
  

export { FilterTodos, SortControl };
