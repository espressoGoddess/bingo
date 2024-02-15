  // import { createClient } from '@/utils/supabase/server';

import PrintConfiguration from "@/components/PrintConfiguration";

  export default async function Notes() {
    // const supabase = createClient();
    // const { data: notes } = await supabase.from("notes").select();

    const tasks = [
    { type: 'string', task: 'Ride the High Roller' },
    { type: 'string', task: 'Photo with bride and groom' },
    { type: 'string', task: 'Play a song on a jukebox' },
    { type: 'string', task: 'Visit somewhere off the strip' },
    { type: 'string', task: 'Get a free drink' },
    { type: 'string', task: 'Ride the High Roller' },
    { type: 'string', task: 'Photo with bride and groom' },
    { type: 'string', task: 'Play a song on a jukebox' },
    { type: 'string', task: 'Visit somewhere off the strip' },
    { type: 'string', task: 'Get a free drink' },
    { type: 'string', task: 'Ride the High Roller' },
    { type: 'string', task: 'Photo with bride and groom' },
    { type: 'string', task: 'Visit somewhere off the strip' },
    { type: 'string', task: 'Get a free drink' },
    { type: 'string', task: 'Ride the High Roller' },
    { type: 'string', task: 'Photo with bride and groom' },
    { type: 'string', task: 'Play a song on a jukebox' },
    { type: 'string', task: 'Visit somewhere off the strip' },
    { type: 'string', task: 'Get a free drink' },
    { type: 'string', task: 'Ride the High Roller' },
    { type: 'string', task: 'Photo with bride and groom' },
    { type: 'string', task: 'Play a song on a jukebox' },
    { type: 'string', task: 'Visit somewhere off the strip' },
    { type: 'string', task: 'Get a free drink' },
  ];

    return <PrintConfiguration tasks={tasks} />
  }