import parseDate from './ParseDate';
import { createClient } from './supabase/server';
import { UserTask } from './types';

export default async function getUserTasksWithInfo(gameId: number, userId: number, usersTaskId: number) {
  const supabase = createClient();
  const { data, error: fetchError } = await supabase
    .from('users_tasks')
    .select(`*,task:tasks(description)`)
    .eq('id', usersTaskId)
    .eq('user_id', userId)
    .eq('tasks.game_id', gameId);

  if (fetchError) {
    throw fetchError;
  }
  const singleTaskDetails: UserTask & {
    task: {
      description: string;
    };
  } = data[0];
  let formattedDateTime;
  if (singleTaskDetails.completed_at) {
    formattedDateTime = parseDate(singleTaskDetails.completed_at);
  }

  return {
    description: singleTaskDetails.task.description,
    completed: singleTaskDetails.completed,
    grid_row: singleTaskDetails.grid_row,
    grid_column: singleTaskDetails.grid_column,
    id: usersTaskId,
    completed_at: formattedDateTime,
  };
}
