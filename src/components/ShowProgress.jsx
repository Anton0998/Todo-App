import ProgressBar from 'react-bootstrap/ProgressBar';

export default function ShowProgress({ todos }) {
  const completedTodos = todos.filter((todo) => todo.completed).length;

  const progressPercentage = todos.length === 0 
    ? 0 
    : Math.round((completedTodos / todos.length) * 100);

  return (
    <div>
      <ProgressBar animated now={progressPercentage} />
      <p className='text-secondary text-end'>
        <small>
          {`Du har klaret ${completedTodos} ud af ${todos.length} opgaver`}
        </small>
      </p>
    </div>
  );
}
