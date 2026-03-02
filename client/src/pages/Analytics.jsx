import DashboardLayout from '../components/dashboard/DashboardLayout';
import { TrendingUp, TrendingDown, Eye, MousePointerClick, Target, Zap, Download, Calendar } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Pages.css';

const kpis = [
    { label: 'Total Impressions', value: '128.4K', change: '+12.3%', up: true, icon: <Eye size={20} />, color: 'var(--accent-primary-light)', iconColor: 'var(--accent-primary)' },
    { label: 'Click-Through Rate', value: '3.8%', change: '+0.5%', up: true, icon: <MousePointerClick size={20} />, color: 'var(--success-light)', iconColor: 'var(--success)' },
    { label: 'Conversions', value: '2,456', change: '+8.1%', up: true, icon: <Target size={20} />, color: 'var(--info-light)', iconColor: 'var(--info)' },
    { label: 'Engagement Rate', value: '6.2%', change: '-0.3%', up: false, icon: <Zap size={20} />, color: 'var(--warning-light)', iconColor: 'var(--warning)' },
];

const chartData = [
    { name: 'Mon', impressions: 4200, clicks: 160, conversions: 32 },
    { name: 'Tue', impressions: 5100, clicks: 195, conversions: 41 },
    { name: 'Wed', impressions: 4800, clicks: 182, conversions: 38 },
    { name: 'Thu', impressions: 6200, clicks: 240, conversions: 52 },
    { name: 'Fri', impressions: 7100, clicks: 270, conversions: 58 },
    { name: 'Sat', impressions: 5500, clicks: 210, conversions: 44 },
    { name: 'Sun', impressions: 4900, clicks: 188, conversions: 39 },
];

const pieData = [
    { name: 'Instagram', value: 42, color: '#E1306C' },
    { name: 'Facebook', value: 28, color: '#4267B2' },
    { name: 'Google', value: 18, color: '#34A853' },
    { name: 'LinkedIn', value: 12, color: '#0077B5' },
];

export default function Analytics() {
    return (
        <DashboardLayout title="Analytics">
            <div className="analytics-filters">
                <button className="btn btn-secondary btn-sm"><Calendar size={14} /> Last 7 Days</button>
                <button className="btn btn-ghost btn-sm">Last 30 Days</button>
                <button className="btn btn-ghost btn-sm">Last 90 Days</button>
                <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}><Download size={14} /> Export CSV</button>
            </div>

            <div className="analytics-kpi-grid">
                {kpis.map((k, i) => (
                    <div key={i} className="dash-stat-card">
                        <div className="dash-stat-header">
                            <div className="dash-stat-icon" style={{ background: k.color, color: k.iconColor }}>{k.icon}</div>
                            <span className={`dash-stat-change ${k.up ? 'up' : 'down'}`}>
                                {k.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{k.change}
                            </span>
                        </div>
                        <div className="dash-stat-value">{k.value}</div>
                        <div className="dash-stat-label">{k.label}</div>
                    </div>
                ))}
            </div>

            <div className="analytics-chart-card">
                <div className="analytics-chart-header">
                    <h3>Impressions & Clicks</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="impressionsGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                        <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} />
                        <YAxis stroke="var(--text-tertiary)" fontSize={12} />
                        <Tooltip contentStyle={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="impressions" stroke="#6366F1" fill="url(#impressionsGrad)" strokeWidth={2} />
                        <Area type="monotone" dataKey="clicks" stroke="#8B5CF6" fill="url(#clicksGrad)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                <div className="analytics-chart-card">
                    <div className="analytics-chart-header">
                        <h3>Conversions by Day</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                            <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} />
                            <YAxis stroke="var(--text-tertiary)" fontSize={12} />
                            <Tooltip contentStyle={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '12px' }} />
                            <Bar dataKey="conversions" fill="#6366F1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="analytics-chart-card">
                    <div className="analytics-chart-header">
                        <h3>Traffic by Platform</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                        {pieData.map((d, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                                <span>{d.name} ({d.value}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
