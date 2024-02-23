import { createClient } from '@/utils/supabase/server';

import PrintConfiguration from '@/components/PrintConfiguration';
import getUser from '@/utils/auth';

export default async function print() {
  await getUser();

  const supabase = createClient();

  const { data: tasks, error } = await supabase.from('tasks').select().eq('game_id', 2);
  return <PrintConfiguration tasks={tasks ?? []} />;
}
