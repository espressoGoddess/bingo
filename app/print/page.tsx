import { createClient } from '@/utils/supabase/server';

import PrintConfiguration from '@/components/PrintConfiguration';
import getUser from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function print() {
  const user = await getUser();
  if (!user) return redirect('login');

  const supabase = createClient();

  const { data: tasks, error } = await supabase.from('tasks').select().eq('game_id', 2);
  return <PrintConfiguration tasks={tasks ?? []} />;
}
