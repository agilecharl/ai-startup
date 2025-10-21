import { getRecords } from '@ai-startup/data';
import { useEffect, useState } from 'react';
import './agents-list.module.css';
import CrudMenu from '../../../../utils/src/lib/crud-menu/crud-menu';

type Agent = {
  agent: string;
  description: string;
  // add other properties if needed
};

const AgentsList = () => {

  const [agents, setAgents] = useState<Agent[]>([]);

  const getAgents = async () => {
   
    await getRecords('ai/agents', {}).then((res) => {
      setAgents(res as Agent[]);
    });

    return agents;
  }

  useEffect(() => {
    getAgents();
  }, []);

  return (
    <div className="agents-container" style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h2 className="agents-title" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 700 }}>
      🚀 Available AI Agents
      </h2>
      <div className="agents-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
      {agents && agents.map((agent) => (
        <div
        key={agent.agent}
        className="agent-card"
        style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: '1rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          padding: '1.5rem',
          transition: 'transform 0.2s',
          cursor: 'pointer',
        }}
        >
        <h3 className="agent-name" style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600, color: '#2d3748' }}>
          {agent.agent}
        </h3>
        <p className="agent-description" style={{ margin: 0, color: '#4a5568', fontSize: '1rem' }}>
          {agent.description}
        </p>
        </div>
      ))}
      </div>
      <CrudMenu objectName="agent" apiBase="/api/agents" idField="agent" />
    </div>
  );
};

export default AgentsList;
