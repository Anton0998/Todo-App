import './App.css';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="mb-2 mt-4 mx-auto">
      <h1 id='title' className='text-center'>
        To-do list
      </h1>
      <TodoList/>
    </div>
  );
}

export default App;
