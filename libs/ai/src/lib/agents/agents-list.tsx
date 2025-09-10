import { getRecords } from '@ai-startup/data';
import { useEffect } from 'react';
import './agents-list.module.css';

const AgentsList = () => {
  const agents = [
    {
      name: 'Research Analyst AI',
      description:
        'Finds and summarizes information from multiple sources quickly.',
      costPerHour: 15,
    },
    {
      name: 'Code Assistant AI',
      description:
        'Helps with software development, debugging, and automation.',
      costPerHour: 20,
    },
    {
      name: 'Content Creator AI',
      description:
        'Generates blog posts, social media content, and marketing copy.',
      costPerHour: 18,
    },
    {
      name: 'Data Analyst AI',
      description:
        'Processes datasets and generates insights, charts, and reports.',
      costPerHour: 25,
    },
  ];

  const getAgents = async () => {
   
    await getRecords('/api/agents', {}).then((res) => {
      console.log('Fetched agents:', res);
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
        {agents.map((agent) => (
          <div key={agent.name} className="agent-card">
            <h3 className="agent-name">{agent.name}</h3>
            <p className="agent-description">{agent.description}</p>
            <div className="agent-footer">
              <span className="agent-cost">${agent.costPerHour}/hr</span>
              <button className="rent-btn">Rent Agent</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentsList;
