import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Plus, Palette, Edit3, MoreHorizontal } from 'lucide-react';
import './Pages.css';

const brandKits = [
    {
        name: 'Acme Studio', colors: ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'],
        fonts: [{ label: 'Heading', value: 'Outfit' }, { label: 'Body', value: 'Inter' }],
        gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
    },
    {
        name: 'TechFlow', colors: ['#3B82F6', '#1D4ED8', '#0F172A', '#F1F5F9'],
        fonts: [{ label: 'Heading', value: 'Inter' }, { label: 'Body', value: 'Inter' }],
        gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
    },
    {
        name: 'GreenLeaf', colors: ['#10B981', '#059669', '#047857', '#D1FAE5'],
        fonts: [{ label: 'Heading', value: 'Outfit' }, { label: 'Body', value: 'Georgia' }],
        gradient: 'linear-gradient(135deg, #10B981, #059669)',
    },
];

export default function BrandKits() {
    return (
        <DashboardLayout title="Brand Kits">
            <div style={{ marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Manage your brand assets — logos, colors, typography, and more.</p>
            </div>

            <div className="brand-kits-grid">
                <div className="brand-kit-card brand-kit-new" style={{ cursor: 'pointer' }}>
                    <Plus size={32} />
                    <span>Create New Kit</span>
                </div>

                {brandKits.map((kit, i) => (
                    <div key={i} className="brand-kit-card">
                        <div className="brand-kit-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <div className="brand-kit-logo" style={{ background: kit.gradient }}>{kit.name[0]}</div>
                                <div>
                                    <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{kit.name}</h3>
                                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>3 assets</span>
                                </div>
                            </div>
                            <button className="btn btn-icon btn-sm"><MoreHorizontal size={16} /></button>
                        </div>

                        <div>
                            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Colors</p>
                            <div className="brand-kit-colors">
                                {kit.colors.map((c, j) => (
                                    <div key={j} className="brand-kit-color" style={{ background: c }} title={c} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Typography</p>
                            <div className="brand-kit-fonts">
                                {kit.fonts.map((f, j) => (
                                    <div key={j} className="brand-kit-font">
                                        <span>{f.label}</span>
                                        <strong style={{ color: 'var(--text-primary)' }}>{f.value}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)' }}>
                            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}><Edit3 size={14} /> Edit</button>
                            <button className="btn btn-primary btn-sm" style={{ flex: 1 }}><Palette size={14} /> Apply</button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
