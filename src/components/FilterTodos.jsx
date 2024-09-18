import { useState } from 'react';
import { Dropdown, ListGroup, Form, Badge } from "react-bootstrap/";

const priorityMap = {
    low: 1,
    medium: 2,
    high: 3,
};

const sortItems = (items, sortBy) => {
    return items.sort((a, b) => {
        if (sortBy === 'priority') {
            return priorityMap[a.priority] - priorityMap[b.priority];
        } else if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });
};

const SortControl = ({ onSortChange }) => {
    const [sortCriteria, setSortCriteria] = useState('');

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSortCriteria(selectedSort);
        if (onSortChange) {
            onSortChange(selectedSort); // Call the prop function
        }
    };

    return (
        <Dropdown className='ms-auto'>
            <Dropdown.Toggle variant="outline-secondary" size='sm' id="dropdown-basic">
                Sortér
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange({ target: { value: 'priority' } })}>
                    Prioritet
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange({ target: { value: 'title' } })}>
                    Alfabetisk
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

function FilterTodos({ todos, onComplete, sortCriteria }) {
    const sortedTodos = sortItems([...todos], sortCriteria);

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
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export { FilterTodos, SortControl };
