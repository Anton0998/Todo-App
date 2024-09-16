import './App.css';
import ToDo from './components/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="my-5 mx-auto">
      <h1 className='text-center'>
        To-do list
      </h1>
      <ToDo />
    </div>
  );
}

export default App;
