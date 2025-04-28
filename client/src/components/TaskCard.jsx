import PropTypes from 'prop-types';

const TaskCard = ({ task, onUpdate, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <span className={`px-2 py-1 rounded text-xs ${task.priority === 'High' ? 'bg-red-200' : task.priority === 'Medium' ? 'bg-yellow-200' : 'bg-green-200'}`}>
          {task.priority}
        </span>
      </div>
      <p>{task.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        <div className="space-x-2">
          {/* Complete/Undo Button */}
          <button
            onClick={() => onUpdate(task._id, { status: task.status === 'complete' ? 'incomplete' : 'complete' })}
            className={`text-sm ${task.status === 'complete' ? 'text-green-600' : 'text-blue-600'}`}
            >
            {task.status === 'complete' ? 'Undo' : 'Complete'}
          </button>


          {/* Delete Button */}
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,  // Add onEdit prop validation
};

export default TaskCard;
