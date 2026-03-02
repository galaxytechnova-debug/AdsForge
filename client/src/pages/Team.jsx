import { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { UserPlus, MoreHorizontal, Shield, Edit3, Eye, Mail, X } from 'lucide-react';
import './Pages.css';

const members = [
    { name: 'John Doe', email: 'john@adforge.io', role: 'Owner', avatar: 'J', color: 'var(--accent-gradient)' },
    { name: 'Sarah Chen', email: 'sarah@company.com', role: 'Editor', avatar: 'S', color: 'linear-gradient(135deg, #EC4899, #F43F5E)' },
    { name: 'Mike Rivera', email: 'mike@company.com', role: 'Editor', avatar: 'M', color: 'linear-gradient(135deg, #3B82F6, #2563EB)' },
    { name: 'Emily Park', email: 'emily@company.com', role: 'Viewer', avatar: 'E', color: 'linear-gradient(135deg, #10B981, #059669)' },
];

const roleIcons = {
    Owner: <Shield size={14} />,
    Editor: <Edit3 size={14} />,
    Viewer: <Eye size={14} />,
};

const roleBadges = {
    Owner: 'badge-primary',
    Editor: 'badge-success',
    Viewer: 'badge-warning',
};

export default function Team() {
    const [showInvite, setShowInvite] = useState(false);

    return (
        <DashboardLayout title="Team">
            <div style={{ marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Manage team members and their permissions.</p>
                <button className="btn btn-primary btn-sm" onClick={() => setShowInvite(true)}><UserPlus size={16} /> Invite Member</button>
            </div>

            <div className="team-grid">
                {members.map((m, i) => (
                    <div key={i} className="team-member-card">
                        <div className="avatar" style={{ background: m.color }}>{m.avatar}</div>
                        <div className="team-member-info">
                            <h4>{m.name}</h4>
                            <span>{m.email}</span>
                        </div>
                        <span className={`badge ${roleBadges[m.role]}`}>{roleIcons[m.role]} {m.role}</span>
                        <button className="btn btn-icon btn-sm"><MoreHorizontal size={16} /></button>
                    </div>
                ))}
                <div className="team-member-card team-invite-card" onClick={() => setShowInvite(true)}>
                    <UserPlus size={24} />
                    <span>Invite Member</span>
                </div>
            </div>

            {showInvite && (
                <div className="modal-overlay" onClick={() => setShowInvite(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 style={{ fontSize: 'var(--text-xl)' }}>Invite Team Member</h2>
                            <button className="btn btn-icon" onClick={() => setShowInvite(false)}><X size={18} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
                                <label className="input-label">Email Address</label>
                                <input type="email" className="input" placeholder="colleague@company.com" />
                            </div>
                            <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
                                <label className="input-label">Role</label>
                                <select className="input">
                                    <option value="editor">Editor</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Message (optional)</label>
                                <textarea className="input" rows="3" placeholder="Hey, join our team on AdForge!" style={{ resize: 'vertical' }} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowInvite(false)}>Cancel</button>
                            <button className="btn btn-primary"><Mail size={16} /> Send Invite</button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
