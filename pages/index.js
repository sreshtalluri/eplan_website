import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    }
    getSession();

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
    <>
        <Navbar />
        <div className="container py-5">
        <div className="text-center mb-5">
            <h1 className="display-4 text-primary mb-3">Welcome to Event Planner!</h1>
            <p className="lead">Easily find venues, musicians, caterers, photographers, and videographers for your big day.</p>
            {user ? (
            <button onClick={handleSignOut} className="btn btn-danger mt-3">Sign Out</button>
            ) : (
            <div className="d-flex justify-content-center gap-3 mt-3">
                <a href="/login" className="btn btn-primary">Login</a>
                <a href="/signup" className="btn btn-outline-primary">Sign Up</a>
            </div>
            )}
        </div>

        <div className="row g-4">
            {/* Venue */}
            <div className="col-md-4">
            <div className="card h-100 shadow-sm">
                <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Find a Venue</h5>
                <p className="card-text">Browse theaters and performance spaces perfect for your event.</p>
                <a href="/venues" className="btn btn-primary mt-auto">View Venues</a>
                </div>
            </div>
            </div>

            {/* Musicians */}
            <div className="col-md-4">
            <div className="card h-100 shadow-sm">
                <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Hire Musicians</h5>
                <p className="card-text">Find talented live musicians to accompany your dance performance.</p>
                <a href="/musicians" className="btn btn-primary mt-auto">View Musicians</a>
                </div>
            </div>
            </div>

            {/* Caterers */}
            <div className="col-md-4">
            <div className="card h-100 shadow-sm">
                <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Arrange Catering</h5>
                <p className="card-text">Find restaurants and catering services to serve delicious food.</p>
                <a href="/caterers" className="btn btn-primary mt-auto">View Caterers</a>
                </div>
            </div>
            </div>

            {/* Photographer */}
            <div className="col-md-6">
            <div className="card h-100 shadow-sm">
                <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Book Photographer</h5>
                <p className="card-text">Capture memories with a professional photographer.</p>
                <a href="/photographers" className="btn btn-primary mt-auto">View Photographers</a>
                </div>
            </div>
            </div>

            {/* Videographer */}
            <div className="col-md-6">
            <div className="card h-100 shadow-sm">
                <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">Book Videographer</h5>
                <p className="card-text">Record your full performance with expert videography services.</p>
                <a href="/videographers" className="btn btn-primary mt-auto">View Videographers</a>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}
