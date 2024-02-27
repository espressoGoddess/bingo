import { createClient } from './supabase/server';

export default async function updateCompletedStatusOfTask(
  newCompletedStatus: boolean,
  id: number,
  userId: number,
  completedAt: Date,
) {
  const supabase = createClient();
  const { data: completedTask, error: fetchError } = await supabase
    .from('users_tasks')
    .update({ completed: newCompletedStatus, completed_at: completedAt })
    .eq('id', id)
    .eq('user_id', userId)
    .select();

  if (fetchError) {
    throw fetchError;
  }
  if (!completedTask?.length) {
    throw new Error("Can't find user task");
  }

  return {
    completed: completedTask[0].completed,
    completed_at: completedTask[0].completed_at,
  };
}
