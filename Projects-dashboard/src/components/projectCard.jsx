
import React from 'react';

export default function ProjectCard({ projectName, onClick }) {
  return (
    <div className="project-card" onClick={onClick} tabIndex={0} role="button" aria-label={`Open ${projectName} project`}>
      <h4 className="project-card-title">{projectName}</h4>
      <div className="project-card-bar" />
      <div className="project-card-desc">Open Project</div>
    </div>
  );
}
