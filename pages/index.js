import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check for active session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.reload();
  }

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        {user ? (
          <>
            <h1 className="text-center mb-4 text-success">Welcome, {user.email}!</h1>
            <button onClick={handleSignOut} className="btn btn-danger w-100">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <h1 className="text-center mb-4 text-primary">Welcome to the App!</h1>
            <div className="d-flex justify-content-between">
              <a href="/login" className="btn btn-primary w-45">Login</a>
              <a href="/signup" className="btn btn-outline-primary w-45">Sign Up</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
