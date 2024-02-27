import parseDate from './parseDate';
import { createClient } from './supabase/server';
import { UserTask } from './types';

export default async function getSingleTaskDetails(gameId: number, userId: number, usersTaskId: number) {
  const supabase = createClient();

  const { data, error: fetchError } = await supabase
    .from('users_tasks')
    .select(`*,task:tasks(description, type)`)
    .eq('id', usersTaskId)
    .eq('user_id', userId)
    .eq('tasks.game_id', gameId);

  if (fetchError) {
    throw fetchError;
  }
  let singleTaskDetails: UserTask & {
    task: {
      description: string;
      type: string;
    };
  } = data[0];
  let formattedDateTime;
  if (singleTaskDetails.completed_at) {
    formattedDateTime = parseDate(singleTaskDetails.completed_at);
  }

  let description = singleTaskDetails.task.description;
  if (singleTaskDetails.task.type === 'empty') {
    const { data: freeSpaceTask, error: freeSpaceTaskError } = await supabase
      .from('free_space_user_added_tasks')
      .select()
      .eq('user_task_id', usersTaskId)
      .eq('user_id', userId);

    if (freeSpaceTask?.length) {
      description = freeSpaceTask[0].description;
      if (freeSpaceTaskError) {
        throw freeSpaceTaskError;
      }
    }
  }

  return {
    description,
    completed: singleTaskDetails.completed,
    grid_row: singleTaskDetails.grid_row,
    grid_column: singleTaskDetails.grid_column,
    id: usersTaskId,
    completed_at: formattedDateTime,
    type: singleTaskDetails.task.type,
  };
}
