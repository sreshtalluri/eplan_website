import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

export default function Venues() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function fetchVenues() {
      const { data, error } = await supabase.from('venues').select('*');
      if (error) console.error('Error fetching venues:', error);
      else setVenues(data);
    }
    fetchVenues();
  }, []);

  return (
    <>
        <Navbar />
        <div className="container py-5">
        <h1 className="text-center mb-4">Browse Venues</h1>
        <div className="row">
            {venues.map((venue) => (
            <div key={venue.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                <img src={venue.image_url} className="card-img-top" alt={venue.name} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{venue.name}</h5>
                    <p className="card-text text-muted">${venue.price}</p>
                    <p className="card-text">{venue.description}</p>
                    <p className="card-text">
                      <strong>Phone:</strong> {venue.contact_phone}
                      <br />
                      <strong>Email:</strong> {venue.contact_email}
                      <br />
                      <strong>Website:</strong> <a href={venue.contact_website} target="_blank" rel="noopener noreferrer">{venue.contact_website}</a>
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
