import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Search, Filter } from 'lucide-react';
import './Pages.css';

const categories = ['All', 'Social Media', 'Product Launch', 'E-commerce', 'Lead Gen', 'Events', 'Video Ads', 'Display Banners'];

const templates = [
    { name: 'Summer Vibes', category: 'Social Media', platform: 'Instagram', gradient: 'linear-gradient(135deg, #FF6B6B, #FFA07A)' },
    { name: 'Product Showcase', category: 'Product Launch', platform: 'Facebook', gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' },
    { name: 'Flash Sale', category: 'E-commerce', platform: 'Instagram', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
    { name: 'Lead Magnet', category: 'Lead Gen', platform: 'Google', gradient: 'linear-gradient(135deg, #10B981, #3B82F6)' },
    { name: 'Event Invite', category: 'Events', platform: 'Facebook', gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
    { name: 'Brand Story', category: 'Video Ads', platform: 'YouTube', gradient: 'linear-gradient(135deg, #EF4444, #B91C1C)' },
    { name: 'Banner Ad', category: 'Display Banners', platform: 'Google', gradient: 'linear-gradient(135deg, #0EA5E9, #2563EB)' },
    { name: 'Minimal Promo', category: 'Social Media', platform: 'LinkedIn', gradient: 'linear-gradient(135deg, #1E293B, #475569)' },
    { name: 'Sale Countdown', category: 'E-commerce', platform: 'Instagram', gradient: 'linear-gradient(135deg, #F97316, #DC2626)' },
    { name: 'Webinar Promo', category: 'Events', platform: 'LinkedIn', gradient: 'linear-gradient(135deg, #6366F1, #06B6D4)' },
    { name: 'App Launch', category: 'Product Launch', platform: 'Facebook', gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)' },
    { name: 'Free Trial CTA', category: 'Lead Gen', platform: 'Google', gradient: 'linear-gradient(135deg, #10B981, #14B8A6)' },
];

export default function Templates() {
    const [active, setActive] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = templates.filter(t =>
        (active === 'All' || t.category === active) &&
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout title="Templates">
            <div className="templates-header">
                <div className="templates-search">
                    <Search size={16} style={{ color: 'var(--text-tertiary)' }} />
                    <input type="text" placeholder="Search templates..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <button className="btn btn-secondary btn-sm"><Filter size={14} /> Filters</button>
            </div>

            <div className="templates-categories">
                {categories.map(c => (
                    <button key={c} className={`templates-category ${active === c ? 'active' : ''}`} onClick={() => setActive(c)}>
                        {c}
                    </button>
                ))}
            </div>

            <div className="templates-grid">
                {filtered.map((t, i) => (
                    <Link to="/editor" key={i} className="template-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="template-thumb" style={{ background: t.gradient }}>
                            <div className="template-overlay">
                                <button className="btn btn-primary btn-sm">Use Template</button>
                            </div>
                        </div>
                        <div className="template-info">
                            <h4>{t.name}</h4>
                            <span>{t.platform} · {t.category}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </DashboardLayout>
    );
}
