import { getRecords } from '@ai-startup/data';
import { useEffect, useState } from 'react';
import './crews-list.module.css';

type Crew = {
  crew: string;
  description: string;
  // add other properties if needed
};

const CrewsList = () => {

  const [crews, setCrews] = useState<Crew[]>([]);

  const getCrews = async () => {
   
    await getRecords('ai/crews', {}).then((res) => {
      setCrews(res as Crew[]);
    });

    return crews;
  }

  useEffect(() => {
    getCrews();
  }, []);

  return (
    <div style={{ padding: '2rem', flex: 1, backgroundColor: 'lightblue' }}>
      <h2 className="crews-title" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 700 }}>
      🚀 Available AI Crews
      </h2>
      <div
      className="crews-grid"
      style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
      gap: '1.5rem',
      }}
      >
      {crews && crews.map((crew) => (
      <div
      key={crew.crew}
      className="crew-card"
      style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      borderRadius: '1rem',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      padding: '1.5rem',
      transition: 'transform 0.2s',
      cursor: 'pointer',
      }}
      >
      <h3 className="crew-name" style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600, color: '#2d3748' }}>
      {crew.crew}
      </h3>
      <p className="crew-description" style={{ margin: 0, color: '#4a5568', fontSize: '1rem' }}>
      {crew.description.length > 100
      ? crew.description.slice(0, 100) + '...'
      : crew.description}
      </p>
      </div>
      ))}
      </div>
    </div>
  );
};

export default CrewsList;
