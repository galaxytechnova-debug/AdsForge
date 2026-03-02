import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Plus, TrendingUp, TrendingDown, Eye, MousePointerClick, Target, Zap } from 'lucide-react';

const stats = [
    { label: 'Total Projects', value: '24', change: '+3', up: true, icon: <Target size={20} />, color: 'var(--accent-primary-light)', iconColor: 'var(--accent-primary)' },
    { label: 'Impressions', value: '12.4K', change: '+18%', up: true, icon: <Eye size={20} />, color: 'var(--success-light)', iconColor: 'var(--success)' },
    { label: 'Click Rate', value: '3.2%', change: '+0.4%', up: true, icon: <MousePointerClick size={20} />, color: 'var(--info-light)', iconColor: 'var(--info)' },
    { label: 'Conversions', value: '156', change: '-2%', up: false, icon: <Zap size={20} />, color: 'var(--warning-light)', iconColor: 'var(--warning)' },
];

const recentProjects = [
    { name: 'Summer Sale Campaign', platform: 'Instagram', updated: '2 hours ago', gradient: 'linear-gradient(135deg, #FF6B6B, #EE5A24)' },
    { name: 'Product Launch Banner', platform: 'Facebook', updated: '5 hours ago', gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' },
    { name: 'Holiday Special', platform: 'Google', updated: '1 day ago', gradient: 'linear-gradient(135deg, #10B981, #059669)' },
    { name: 'Brand Awareness', platform: 'LinkedIn', updated: '2 days ago', gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' },
    { name: 'Flash Sale Event', platform: 'Instagram', updated: '3 days ago', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)' },
];

export default function Dashboard() {
    return (
        <DashboardLayout title="Dashboard">
            <div className="dash-welcome animate-fade-in">
                <h2>Welcome back, John! ✨</h2>
                <p>Here's what's happening with your ad campaigns.</p>
            </div>

            <div className="dash-stats">
                {stats.map((s, i) => (
                    <div key={i} className="dash-stat-card animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                        <div className="dash-stat-header">
                            <div className="dash-stat-icon" style={{ background: s.color, color: s.iconColor }}>{s.icon}</div>
                            <span className={`dash-stat-change ${s.up ? 'up' : 'down'}`}>
                                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {s.change}
                            </span>
                        </div>
                        <div className="dash-stat-value">{s.value}</div>
                        <div className="dash-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="dash-section-header">
                <h3>Recent Projects</h3>
                <Link to="/projects" className="btn btn-ghost btn-sm">View All</Link>
            </div>

            <div className="dash-projects-grid">
                <Link to="/editor" className="dash-project-new card">
                    <Plus size={32} />
                    <span>Create New Ad</span>
                </Link>
                {recentProjects.map((p, i) => (
                    <Link to="/editor" key={i} className="dash-project-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="dash-project-thumb" style={{ background: p.gradient }}>
                            {p.name.split(' ').slice(0, 2).join(' ')}
                        </div>
                        <div className="dash-project-info">
                            <h4>{p.name}</h4>
                            <div className="dash-project-meta">
                                <span>{p.platform}</span>
                                <span>{p.updated}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </DashboardLayout>
    );
}
