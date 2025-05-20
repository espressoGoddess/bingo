import { createClient } from './supabase/server';
import { EnrichedUserTask, UserTask } from './types';

export default async function getUserTasksWithInfo(
  gameId: number,
  userId: number,
): Promise<EnrichedUserTask[]> {
  const supabase = createClient();
  const { data, error: fetchError } = await supabase
    .from('users_tasks')
    .select(`*,tasks(game_id, type, description),free_space_user_added_tasks(description)`)
    .eq('tasks.game_id', gameId)
    .eq('user_id', userId);
  if (fetchError) {
    throw fetchError;
  }
  const userTasksWithInfo: (UserTask & {
    tasks: {
      game_id: number;
      type: string;
      description: string;
    };
    free_space_user_added_tasks: [
      {
        description: string;
      },
    ];
  })[] = data;

  return userTasksWithInfo.map((uT) => ({
    ...uT,
    game_id: uT.tasks.game_id,
    type: uT.tasks.type,
    description: uT.free_space_user_added_tasks[0]?.description ?? uT.tasks.description,
  }));
}
