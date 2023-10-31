import { devtools } from 'zustand/middleware';
import { Task, TaskStatus } from '../../interfaces';
import { StateCreator, create } from 'zustand';

interface TaskState {
  tasks: Record<string, Task>;
  dragginTaskId?: string;
  getTaskByStatus: ( status: TaskStatus ) => Task[];
  setDragginTaskId: ( taskId: string ) => void;
  removeDragginTaskId: () => void;
  changeTaskStatus: ( taskId: string, status: TaskStatus ) => void;
  onTaskDrop: ( status: TaskStatus ) => void;
}

const storeApi: StateCreator<TaskState> = ( set, get ) => ( {

  tasks: {
    'abc-1': { id: 'abc-1', title: 'Task 1', status: 'open' },
    'abc-2': { id: 'abc-2', title: 'Task 2', status: 'in-progress' },
    'abc-3': { id: 'abc-3', title: 'Task 2', status: 'in-progress' },
  },

  dragginTaskId: undefined,

  getTaskByStatus: ( status: TaskStatus ) => {
    const tasks = get().tasks;
    return Object.values( tasks ).filter( task => task.status === status );
  },

  setDragginTaskId: ( taskId: string ) => {
    set( { dragginTaskId: taskId } );
  },

  removeDragginTaskId: () => {
    set( { dragginTaskId: undefined } );
  },

  changeTaskStatus: ( taskId, status ) => {
    const task = get().tasks[ taskId ];
    task.status = status;
    set( state => ( {
      tasks: {
        ...state.tasks,
        [ taskId ]: task
      }
    } ) );
  },

  onTaskDrop: ( status: TaskStatus ) => {
    const taskId = get().dragginTaskId;

    if ( !taskId ) return;

    get().changeTaskStatus( taskId, status );
    get().removeDragginTaskId();

  },
} );

export const useTaskStore = create<TaskState>()(
  devtools(
    storeApi
  )
);