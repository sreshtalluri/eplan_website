import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

export default function Videographers() {
  const [videographers, setVideographers] = useState([]);

  useEffect(() => {
    async function fetchVideographers() {
      const { data, error } = await supabase.from('videographers').select('*');
      if (error) console.error('Error fetching videographers:', error);
      else setVideographers(data);
    }
    fetchVideographers();
  }, []);

  return (
    <>
        <Navbar />
        <div className="container py-5">
        <h1 className="text-center mb-4">Book a Videographer</h1>
        <div className="row">
            {videographers.map((videographer) => (
            <div key={videographer.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                <img src={videographer.image_url} className="card-img-top" alt={videographer.name} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{videographer.name}</h5>
                    <p className="card-text text-muted">${videographer.price}</p>
                    <p className="card-text">{videographer.description}</p>
                    <p className="card-text">
                      <strong>Phone:</strong> {videographer.contact_phone}
                      <br />
                      <strong>Email:</strong> {videographer.contact_email}
                      <br />
                      <strong>Website:</strong> <a href={videographer.contact_website} target="_blank" rel="noopener noreferrer">{videographer.contact_website}</a>
                    </p>
                    <button className="btn btn-primary mt-auto">Book Now</button>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    </>
  );
}