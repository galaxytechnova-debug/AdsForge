import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Check, CreditCard, Zap, Crown, ArrowRight } from 'lucide-react';
import './Pages.css';

const plans = [
    {
        name: 'Free', price: '$0', period: '/month',
        features: ['5 projects', '50+ templates', 'Basic editor', 'PNG export', 'Watermark'], current: false,
    },
    {
        name: 'Pro', price: '$19', period: '/month',
        features: ['Unlimited projects', '1000+ templates', 'Full editor + AI', 'All formats', 'Brand kits', 'No watermark', 'Priority support'], current: true,
    },
    {
        name: 'Business', price: '$49', period: '/month',
        features: ['Everything in Pro', 'Team collaboration', 'Analytics', 'A/B testing', 'Custom templates', 'API access', 'Dedicated support'], current: false,
    },
];

export default function Billing() {
    return (
        <DashboardLayout title="Billing">
            <div className="billing-current">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        <Crown size={20} style={{ color: 'var(--accent-primary)' }} />
                        <h3 style={{ fontSize: 'var(--text-lg)' }}>Pro Plan</h3>
                        <span className="badge badge-primary">Active</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Your subscription renews on March 13, 2026</p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <button className="btn btn-secondary btn-sm"><CreditCard size={14} /> Manage Payment</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }}>Cancel</button>
                </div>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Available Plans</h3>
            </div>

            <div className="billing-plans">
                {plans.map((plan, i) => (
                    <div key={i} className={`billing-plan-card ${plan.current ? 'current' : ''}`}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-4)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{plan.name}</h3>
                            {plan.current && <span className="badge badge-primary">Current</span>}
                        </div>
                        <div style={{ marginBottom: 'var(--space-6)' }}>
                            <span style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{plan.price}</span>
                            <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>{plan.period}</span>
                        </div>
                        <button className={`btn ${plan.current ? 'btn-secondary' : 'btn-primary'}`} style={{ width: '100%', marginBottom: 'var(--space-6)' }}>
                            {plan.current ? 'Current Plan' : <>Upgrade <ArrowRight size={16} /></>}
                        </button>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {plan.features.map((f, j) => (
                                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                    <Check size={16} style={{ color: 'var(--success)', flexShrink: 0 }} />{f}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="analytics-chart-card" style={{ marginTop: 'var(--space-8)' }}>
                <div className="analytics-chart-header">
                    <h3>Usage This Month</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
                    {[
                        { label: 'Projects', used: 18, limit: 'Unlimited' },
                        { label: 'Exports', used: 47, limit: 'Unlimited' },
                        { label: 'AI Credits', used: 230, limit: '500' },
                    ].map((u, i) => (
                        <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{u.label}</span>
                                <span style={{ fontWeight: 600 }}>{u.used} / {u.limit}</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-bar-fill" style={{ width: u.limit === 'Unlimited' ? '18%' : `${(u.used / parseInt(u.limit)) * 100}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
