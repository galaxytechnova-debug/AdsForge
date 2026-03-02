import { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Shield, Palette, Globe, Trash2, Moon, Sun } from 'lucide-react';
import './Pages.css';

export default function Settings() {
    const { theme, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState({ email: true, push: true, marketing: false });

    return (
        <DashboardLayout title="Settings">
            {/* Profile */}
            <div className="settings-section">
                <h3><User size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Profile</h3>
                <div className="settings-form-grid">
                    <div className="input-group">
                        <label className="input-label">Full Name</label>
                        <input type="text" className="input" defaultValue="John Doe" />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input type="email" className="input" defaultValue="john@adforge.io" />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Company</label>
                        <input type="text" className="input" defaultValue="Acme Studio" />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Role</label>
                        <input type="text" className="input" defaultValue="Marketing Director" />
                    </div>
                </div>
                <div style={{ marginTop: 'var(--space-4)' }}>
                    <button className="btn btn-primary btn-sm">Save Changes</button>
                </div>
            </div>

            {/* Appearance */}
            <div className="settings-section">
                <h3><Palette size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Appearance</h3>
                <div className="settings-row">
                    <div className="settings-row-label">
                        <h4>Theme</h4>
                        <p>Choose between light and dark mode</p>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={toggleTheme}>
                        {theme === 'light' ? <><Moon size={14} /> Dark Mode</> : <><Sun size={14} /> Light Mode</>}
                    </button>
                </div>
                <div className="settings-row">
                    <div className="settings-row-label">
                        <h4>Language</h4>
                        <p>Select your preferred language</p>
                    </div>
                    <select className="input" style={{ width: '160px' }}>
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                    </select>
                </div>
            </div>

            {/* Notifications */}
            <div className="settings-section">
                <h3><Bell size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Notifications</h3>
                {[
                    { key: 'email', label: 'Email Notifications', desc: 'Receive updates about your projects via email' },
                    { key: 'push', label: 'Push Notifications', desc: 'Get real-time browser notifications' },
                    { key: 'marketing', label: 'Marketing Emails', desc: 'Receive tips, product updates, and offers' },
                ].map(n => (
                    <div key={n.key} className="settings-row">
                        <div className="settings-row-label">
                            <h4>{n.label}</h4>
                            <p>{n.desc}</p>
                        </div>
                        <div
                            className={`toggle ${notifications[n.key] ? 'active' : ''}`}
                            onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                        />
                    </div>
                ))}
            </div>

            {/* Security */}
            <div className="settings-section">
                <h3><Shield size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Security</h3>
                <div className="settings-row">
                    <div className="settings-row-label">
                        <h4>Change Password</h4>
                        <p>Update your password regularly for security</p>
                    </div>
                    <button className="btn btn-secondary btn-sm">Change Password</button>
                </div>
                <div className="settings-row">
                    <div className="settings-row-label">
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security</p>
                    </div>
                    <button className="btn btn-secondary btn-sm">Enable 2FA</button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="settings-section" style={{ borderColor: 'var(--error)' }}>
                <h3 style={{ color: 'var(--error)' }}><Trash2 size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Danger Zone</h3>
                <div className="settings-row">
                    <div className="settings-row-label">
                        <h4>Delete Account</h4>
                        <p>Permanently delete your account and all data</p>
                    </div>
                    <button className="btn btn-sm" style={{ background: 'var(--error)', color: 'white' }}>Delete Account</button>
                </div>
            </div>
        </DashboardLayout>
    );
}
