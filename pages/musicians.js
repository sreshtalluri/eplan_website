import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

export default function Musicians() {
  const [musicians, setMusicians] = useState([]);

  useEffect(() => {
    async function fetchMusicians() {
      const { data, error } = await supabase.from('musicians').select('*');
      if (error) console.error('Error fetching musicians:', error);
      else setMusicians(data);
    }
    fetchMusicians();
  }, []);

  return (
    <>
        <Navbar />
        <div className="container py-5">
        <h1 className="text-center mb-4">Hire Musicians</h1>
        <div className="row">
            {musicians.map((musician) => (
            <div key={musician.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                <img src={musician.image_url} className="card-img-top" alt={musician.name} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{musician.name}</h5>
                    <p className="card-text">{musician.instrument}</p>
                    <p className="card-text text-muted">${musician.price}</p>
                    <p className="card-text">{musician.description}</p>
                    <p className="card-text">
                      <strong>Phone:</strong> {musician.contact_phone}
                      <br />
                      <strong>Email:</strong> {musician.contact_email}
                      <br />
                      <strong>Website:</strong> <a href={musician.contact_website} target="_blank" rel="noopener noreferrer">{musician.contact_website}</a>
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
