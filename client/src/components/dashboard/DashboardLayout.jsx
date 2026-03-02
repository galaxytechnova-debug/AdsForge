import { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
    LayoutDashboard, FolderKanban, Layout, Palette, BarChart3,
    Users, Settings, CreditCard, Sparkles, Sun, Moon, ChevronLeft,
    ChevronRight, LogOut, Plus
} from 'lucide-react';
import './DashboardLayout.css';

const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/projects', icon: <FolderKanban size={20} />, label: 'Projects' },
    { path: '/templates', icon: <Layout size={20} />, label: 'Templates' },
    { path: '/brand-kits', icon: <Palette size={20} />, label: 'Brand Kits' },
    { path: '/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { path: '/team', icon: <Users size={20} />, label: 'Team' },
    { path: '/billing', icon: <CreditCard size={20} />, label: 'Billing' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
];

export default function DashboardLayout({ children, title }) {
    const { theme, toggleTheme } = useTheme();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    return (
        <div className={`dash-layout ${collapsed ? 'dash-collapsed' : ''}`}>
            {/* Mobile overlay */}
            {mobileOpen && <div className="dash-overlay" onClick={() => setMobileOpen(false)} />}

            {/* Sidebar */}
            <aside className={`dash-sidebar ${mobileOpen ? 'open' : ''}`}>
                <div className="dash-sidebar-header">
                    <Link to="/" className="dash-sidebar-logo">
                        <div className="dash-sidebar-logo-icon"><Sparkles size={18} /></div>
                        {!collapsed && <span>AdForge</span>}
                    </Link>
                    <button className="btn btn-icon dash-sidebar-collapse" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                <Link to="/editor" className="dash-new-btn btn btn-primary" style={{ margin: collapsed ? '0 var(--space-2)' : '0 var(--space-4)', justifyContent: 'center' }}>
                    <Plus size={18} />
                    {!collapsed && <span>New Ad</span>}
                </Link>

                <nav className="dash-sidebar-nav">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.icon}
                            {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="dash-sidebar-footer">
                    <button className="dash-nav-item" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        {!collapsed && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
                    </button>
                    <Link to="/" className="dash-nav-item">
                        <LogOut size={20} />
                        {!collapsed && <span>Log Out</span>}
                    </Link>
                    {!collapsed && (
                        <div className="dash-sidebar-user">
                            <div className="avatar avatar-sm">J</div>
                            <div>
                                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>John Doe</div>
                                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Pro Plan</div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <main className="dash-main">
                <header className="dash-topbar">
                    <div className="dash-topbar-left">
                        <button className="btn btn-icon dash-mobile-menu" onClick={() => setMobileOpen(true)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                        </button>
                        <h1 className="dash-page-title">{title || 'Dashboard'}</h1>
                    </div>
                    <div className="dash-topbar-right">
                        <div className="dash-search">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            <input type="text" placeholder="Search..." className="dash-search-input" />
                        </div>
                        <div className="avatar">J</div>
                    </div>
                </header>
                <div className="dash-content">
                    {children}
                </div>
            </main>
        </div>
    );
}
