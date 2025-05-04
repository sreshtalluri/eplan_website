import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.getSession();
    session.then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.reload();
  }

  if (!user) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl mb-4">You are not logged in</h1>
        <a href="/login" className="text-blue-500 underline">Login</a> or <a href="/signup" className="text-blue-500 underline">Sign Up</a>
      </div>
    );
  }

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl mb-4">Welcome {user.email}</h1>
      <button onClick={handleSignOut} className="bg-red-500 text-white p-2 rounded">Sign Out</button>
    </div>
  );
}