import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

export default function Photographers() {
  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    async function fetchPhotographers() {
      const { data, error } = await supabase.from('photographers').select('*');
      if (error) console.error('Error fetching photographers:', error);
      else setPhotographers(data);
    }
    fetchPhotographers();
  }, []);

  return (
    <>
        <Navbar />
        <div className="container py-5">
        <h1 className="text-center mb-4">Book a Photographer</h1>
        <div className="row">
            {photographers.map((photographer) => (
            <div key={photographer.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                <img src={photographer.image_url} className="card-img-top" alt={photographer.name} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{photographer.name}</h5>
                    <p className="card-text text-muted">${photographer.price}</p>
                    <p className="card-text">{photographer.description}</p>
                    <p className="card-text">
                      <strong>Phone:</strong> {photographer.contact_phone}
                      <br />
                      <strong>Email:</strong> {photographer.contact_email}
                      <br />
                      <strong>Website:</strong> <a href={photographer.contact_website} target="_blank" rel="noopener noreferrer">{photographer.contact_website}</a>
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
