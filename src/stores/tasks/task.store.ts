import { devtools } from 'zustand/middleware';
import { Task, TaskStatus } from '../../interfaces';
import { StateCreator, create } from 'zustand';

interface TaskState {
  tasks: Record<string, Task>;
  getTaskByStatus: ( status: TaskStatus ) => Task[];
}

const storeApi: StateCreator<TaskState> = ( _, get ) => ( {
  tasks: {
    'abc-1': { id: 'abc-1', title: 'Task 1', status: 'open' },
    'abc-2': { id: 'abc-2', title: 'Task 2', status: 'in-progress' },
  },
  getTaskByStatus: ( status: TaskStatus ) => {
    const tasks = get().tasks;
    return Object.values( tasks ).filter( task => task.status === status );
  }
} );

export const useTaskStore = create<TaskState>()(
  devtools(
    storeApi
  )
);