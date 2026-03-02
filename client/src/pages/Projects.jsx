import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Grid, List, Plus, MoreVertical, Copy, Trash2 } from 'lucide-react';
import './Pages.css';

const projects = [
    { name: 'Summer Sale Campaign', platform: 'Instagram', updated: '2 hours ago', gradient: 'linear-gradient(135deg, #FF6B6B, #EE5A24)', status: 'Draft' },
    { name: 'Product Launch Banner', platform: 'Facebook', updated: '5 hours ago', gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)', status: 'Published' },
    { name: 'Holiday Special', platform: 'Google', updated: '1 day ago', gradient: 'linear-gradient(135deg, #10B981, #059669)', status: 'Draft' },
    { name: 'Brand Awareness', platform: 'LinkedIn', updated: '2 days ago', gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', status: 'Published' },
    { name: 'Flash Sale Q3', platform: 'Instagram', updated: '3 days ago', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)', status: 'Archived' },
    { name: 'Webinar Promo', platform: 'LinkedIn', updated: '1 week ago', gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)', status: 'Published' },
];

export default function Projects() {
    const [view, setView] = useState('grid');

    return (
        <DashboardLayout title="Projects">
            <div className="projects-header">
                <Link to="/editor" className="btn btn-primary"><Plus size={16} /> New Project</Link>
                <div className="projects-view-toggle">
                    <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><Grid size={16} /></button>
                    <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><List size={16} /></button>
                </div>
            </div>

            {view === 'grid' ? (
                <div className="dash-projects-grid">
                    {projects.map((p, i) => (
                        <Link to="/editor" key={i} className="dash-project-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="dash-project-thumb" style={{ background: p.gradient }}>
                                {p.name.split(' ').slice(0, 2).join(' ')}
                            </div>
                            <div className="dash-project-info">
                                <h4>{p.name}</h4>
                                <div className="dash-project-meta">
                                    <span>{p.platform}</span>
                                    <span className={`badge ${p.status === 'Published' ? 'badge-success' : p.status === 'Archived' ? 'badge-warning' : 'badge-primary'}`}>
                                        {p.status}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="projects-list">
                    {projects.map((p, i) => (
                        <Link to="/editor" key={i} className="project-list-item">
                            <div className="project-list-thumb" style={{ background: p.gradient }}>
                                {p.name[0]}
                            </div>
                            <div className="project-list-info">
                                <h4>{p.name}</h4>
                                <span>{p.platform} · {p.updated}</span>
                            </div>
                            <span className={`badge ${p.status === 'Published' ? 'badge-success' : p.status === 'Archived' ? 'badge-warning' : 'badge-primary'}`}>
                                {p.status}
                            </span>
                            <div className="project-list-actions">
                                <button className="btn btn-icon btn-sm" title="Duplicate"><Copy size={14} /></button>
                                <button className="btn btn-icon btn-sm" title="Delete" style={{ color: 'var(--error)' }}><Trash2 size={14} /></button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
