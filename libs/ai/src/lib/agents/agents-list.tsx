import { getRecords } from '@ai-startup/data';
import { useEffect, useState } from 'react';
import './agents-list.module.css';

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
    <div className="agents-container">
      <h2 className="agents-title">Available AI Agents</h2>
      <div className="agents-grid">
        {agents && agents.map((agent) => (
          <div key={agent.agent} className="agent-card">
            <h3 className="agent-name">{agent.agent}</h3>
            <p className="agent-description">{agent.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentsList;
