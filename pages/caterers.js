import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

export default function Caterers() {
  const [caterers, setCaterers] = useState([]);

  useEffect(() => {
    async function fetchCaterers() {
      const { data, error } = await supabase.from('caterers').select('*');
      if (error) console.error('Error fetching caterers:', error);
      else setCaterers(data);
    }
    fetchCaterers();
  }, []);

  return (
    <>
        <Navbar />
        <div className="container py-5">
        <h1 className="text-center mb-4">Arrange Catering</h1>
        <div className="row">
            {caterers.map((caterer) => (
            <div key={caterer.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                <img src={caterer.image_url} className="card-img-top" alt={caterer.name} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{caterer.name}</h5>
                    <p className="card-text">{caterer.cuisine_type}</p>
                    <p className="card-text text-muted">${caterer.price}</p>
                    <p className="card-text">{caterer.description}</p>
                    <p className="card-text">
                      <strong>Phone:</strong> {caterer.contact_phone}
                      <br />
                      <strong>Email:</strong> {caterer.contact_email}
                      <br />
                      <strong>Website:</strong> <a href={caterer.contact_website} target="_blank" rel="noopener noreferrer">{caterer.contact_website}</a>
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
