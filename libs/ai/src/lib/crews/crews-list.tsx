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
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const getCrews = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getRecords('ai/crews', {});
      setCrews(res as Crew[]);
    } catch (error) {
      console.error('Failed to fetch crews:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch crews');
      setCrews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCrews();
  }, []);

  return (
    <div style={{ padding: '2rem', flex: 1, backgroundColor: 'lightblue' }}>
      <h2 className="crews-title" style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 700 }}>
      🚀 Available AI Crews
      </h2>
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading crews...</p>
        </div>
      )}
      
      {error && (
        <div style={{ 
          backgroundColor: '#fed7d7', 
          border: '1px solid #fc8181', 
          borderRadius: '0.5rem', 
          padding: '1rem', 
          marginBottom: '1rem',
          color: '#c53030'
        }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem', fontWeight: 600 }}>
            Error loading crews
          </h3>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>{error}</p>
        </div>
      )}
      
      {!loading && !error && (
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
      )}
      
      {!loading && !error && crews.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#4a5568' }}>
          <p>No crews available.</p>
        </div>
      )}
    </div>
  );
};

export default CrewsList;
