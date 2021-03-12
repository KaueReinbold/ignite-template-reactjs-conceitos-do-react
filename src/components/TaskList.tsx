import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function getId() {
    const taskSorted = tasks?.sort((taskA: Task, taskB: Task) =>
      taskA.id > taskB.id ? 1 : taskA.id < taskB.id ? -1 : 0
    );
    const latestId = taskSorted[taskSorted.length - 1]?.id | 0;

    return latestId + 1;
  }

  function handleCreateNewTask() {
    const task: Task = {
      id: getId(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, task]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(
      tasks.map((task: Task) => {
        if (task.id === id) task.isComplete = !task.isComplete;
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((task: Task) => task.id !== id));
  }

  return (
    <section className='task-list container'>
      <header>
        <h2>Minhas tasks</h2>

        <div className='input-group'>
          <input
            type='text'
            placeholder='Adicionar novo todo'
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type='submit'
            data-testid='add-task-button'
            onClick={(event) => {
              event.preventDefault();
              if (newTaskTitle && newTaskTitle != ' ') handleCreateNewTask();
            }}
          >
            <FiCheckSquare size={16} color='#fff' />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid='task'
              >
                <label className='checkbox-container'>
                  <input
                    type='checkbox'
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className='checkmark'></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type='button'
                data-testid='remove-task-button'
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
