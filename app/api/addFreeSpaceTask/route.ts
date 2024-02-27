import { NextRequest, NextResponse } from 'next/server';
import getUser from '@/utils/auth';
import addFreeSpaceUserTask from '@/utils/addFreeSpaceUserTask';

async function handler(req: NextRequest) {
  const { freeSpaceUserTask, id } = await req.json();
  const user = await getUser();

  try {
    const newFreeSpaceUserTask = await addFreeSpaceUserTask(user.id, freeSpaceUserTask, id);
    return NextResponse.json({ newFreeSpaceUserTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'An error occurred while updating the task' },
      { status: 500 },
    );
  }
}
export { handler as POST };
