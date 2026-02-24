import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import ProjectCard from './components/projectCard';
import ProjectDetailsScreen from './components/ProjectDetailsScreen';


const projects = [
  "CFP", "SFP", "SOIC", "MAS", "ORES", "ORPRO", "SUNCROP", "INDIGO", "SAXSON", "ISMIE", "CAPRICON"
];

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="dashboard-header">
        <h2 className="dashboard-title">Project Environment Dashboard</h2>
      </header>
      <main className="dashboard-main">
        <div className="card-grid">
          {projects.map((name) => (
            <ProjectCard key={name} projectName={name} onClick={() => navigate(`/project/${name}`)} />
          ))}
        </div>
      </main>
    </div>
  );
}

function ProjectDetailsWrapper() {
  const { name } = useParams();
  const navigate = useNavigate();
  return (
    <ProjectDetailsScreen project={name} onBack={() => navigate('/')} />
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:name" element={<ProjectDetailsWrapper />} />
      </Routes>
    </Router>
  );
}
