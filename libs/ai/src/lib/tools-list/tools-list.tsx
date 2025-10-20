import { getRecords } from '@ai-startup/data';
import { useEffect, useState } from 'react';
import './tools-list.module.css';

type Tool = {
  tool: string;
  description: string;
  // add other properties if needed
};

const ToolsList = ({ onClose }: { onClose: () => void }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    getRecords('ai/tools', {})
      .then((res) => {
        setTools(res as Tool[]);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to fetch tools:', err);
        setError(err.message || 'Failed to fetch tools');
        setTools([]); // Set empty array as fallback
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  
  return (
    <div className="tools-list-root" style={{ maxWidth: 800, margin: '0 auto', padding: '2rem', position: 'relative' }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: '#e53e3e',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '2.5rem',
          height: '2.5rem',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}
        aria-label="Close"
      >
        &times;
      </button>
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 700, textAlign: 'center' }}>
        🚀 Defined AI Tasks
      </h2>
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem', fontSize: '1.1rem', color: '#4a5568' }}>
          Loading tools...
        </div>
      )}
      
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          background: '#fed7d7', 
          borderRadius: '0.5rem', 
          border: '1px solid #fc8181',
          marginBottom: '1rem'
        }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#c53030', marginBottom: '0.5rem' }}>
            ⚠️ Unable to Load Tasks
          </div>
          <div style={{ fontSize: '0.9rem', color: '#742a2a' }}>
            {error}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#742a2a', marginTop: '0.5rem' }}>
            Please check your API configuration and ensure the server is running.
          </div>
        </div>
      )}
      
      {!loading && !error && tools.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          background: '#f7fafc', 
          borderRadius: '0.5rem', 
          color: '#4a5568' 
        }}>
          No tools found. Add some tools to get started!
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {!loading && !error && tools.map((tool) => (
          <div
            key={tool.tool}
            className="tool-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              borderRadius: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '1rem 1.5rem',
              gap: '1.5rem',
            }}
          >
            <div
              className="tool-avatar"
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2d3748',
                flexShrink: 0,
              }}
            >
              {tool.tool[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#2d3748', marginBottom: 4 }}>
                {tool.tool}
              </div>
              <div style={{ color: '#4a5568', fontSize: '1rem' }}>
                {tool.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsList;
