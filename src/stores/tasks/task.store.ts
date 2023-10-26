import { Task } from '../../interfaces';
import { StateCreator, create } from 'zustand';

interface TaskState {
  tasks: Record<string, Task>;
}

const storeApi: StateCreator<TaskState> = ( set ) => ( {
  tasks: {
    'abc-1': { id: 'abc-1', title: 'Task 1', status: 'open' },
    'abc-2': { id: 'abc-2', title: 'Task 2', status: 'in-progress' },
  }
} );

export const useTaskStore = create<TaskState>()( storeApi );