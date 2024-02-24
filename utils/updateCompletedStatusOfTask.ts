import { createClient } from './supabase/server';
import { UserTask } from './types';

export default async function updateCompletedStatusOfTask(
  newCompletedStatus: boolean,
  id: number,
  userId: number,
) {
  const supabase = createClient();
  const { data: completedTask, error: fetchError } = await supabase
    .from('users_tasks')
    .update({ completed: newCompletedStatus })
    .eq('id', id)
    .eq('user_id', userId)
    .select(`*, tasks:tasks(description)`);

  if (fetchError) {
    throw fetchError;
  }
  if (!completedTask?.length) {
    throw new Error('bleebloo, cant find user task');
  }

  const singleTaskDetails: UserTask & {
    tasks: {
      description: string;
    };
  } = completedTask[0];

  return {
    description: singleTaskDetails.tasks.description,
    completed: singleTaskDetails.completed,
    grid_row: singleTaskDetails.grid_row,
    grid_column: singleTaskDetails.grid_column,
  };
}
