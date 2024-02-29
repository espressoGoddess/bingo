import { createClient } from '@/utils/supabase/server';

import PrintConfiguration from '@/components/PrintConfiguration';
import getUser from '@/utils/auth';

export default async function page({ params }: { params: { gameSecret: string } }) {
  const supabase = createClient();
  await getUser(`/g/${params.gameSecret}/print/`);
  const { data: games } = await supabase
    .from('games')
    .select()
    .eq('secret', decodeURIComponent(params.gameSecret).toUpperCase());

  if (!games?.length) {
    return <p>Error: no game</p>;
  }

  const { data: tasks } = await supabase.from('tasks').select().eq('game_id', games[0].id);
  return <PrintConfiguration tasks={tasks ?? []} />;
}
