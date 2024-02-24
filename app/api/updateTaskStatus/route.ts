import { NextRequest, NextResponse } from 'next/server';
import updateCompletedStatusOfTask from '@/utils/updateCompletedStatusOfTask';
import getUser from '@/utils/auth';

async function handler(req: NextRequest) {
  const { id, newCompletedStatus } = await req.json();
  const user = await getUser();

  try {
    const updatedTask = await updateCompletedStatusOfTask(newCompletedStatus, id, user.id);
    return NextResponse.json({ updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'An error occurred while updating the task' },
      { status: 500 },
    );
  }
}
export { handler as PUT };
