import getUser from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Get user session token
  const user = await getUser();
  if (!user) return redirect('login');
  return (
    <div>
      <h2>My Amazing App</h2>

      {user && (
        <div>
          <p>Signed in as {user.name && user.email}</p>
          <a href="/api/auth/signout">Sign out by link</a>
        </div>
      )}

      {!user && <p>Not signed in</p>}
    </div>
  );
}
