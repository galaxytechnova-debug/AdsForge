import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { error: 'Too many requests. Please try again later.' },
});
app.use('/api/', limiter);

// ======================== Mock Data ========================
const users = [
    { id: '1', name: 'John Doe', email: 'john@adforge.io', plan: 'pro', avatar: 'J' },
];

const projects = [
    { id: uuidv4(), name: 'Summer Sale Campaign', platform: 'Instagram', status: 'draft', updatedAt: new Date().toISOString(), gradient: 'linear-gradient(135deg, #FF6B6B, #EE5A24)' },
    { id: uuidv4(), name: 'Product Launch Banner', platform: 'Facebook', status: 'published', updatedAt: new Date().toISOString(), gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' },
    { id: uuidv4(), name: 'Holiday Special', platform: 'Google', status: 'draft', updatedAt: new Date().toISOString(), gradient: 'linear-gradient(135deg, #10B981, #059669)' },
    { id: uuidv4(), name: 'Brand Awareness', platform: 'LinkedIn', status: 'published', updatedAt: new Date().toISOString(), gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' },
];

const templates = [
    { id: uuidv4(), name: 'Summer Vibes', category: 'Social Media', platform: 'Instagram', gradient: 'linear-gradient(135deg, #FF6B6B, #FFA07A)' },
    { id: uuidv4(), name: 'Product Showcase', category: 'Product Launch', platform: 'Facebook', gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' },
    { id: uuidv4(), name: 'Flash Sale', category: 'E-commerce', platform: 'Instagram', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
    { id: uuidv4(), name: 'Lead Magnet', category: 'Lead Gen', platform: 'Google', gradient: 'linear-gradient(135deg, #10B981, #3B82F6)' },
];

const brandKits = [
    { id: uuidv4(), name: 'Acme Studio', colors: ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'], fonts: [{ label: 'Heading', value: 'Outfit' }, { label: 'Body', value: 'Inter' }] },
    { id: uuidv4(), name: 'TechFlow', colors: ['#3B82F6', '#1D4ED8', '#0F172A', '#F1F5F9'], fonts: [{ label: 'Heading', value: 'Inter' }, { label: 'Body', value: 'Inter' }] },
];

const analyticsData = {
    impressions: 128400,
    clicks: 4880,
    conversions: 2456,
    ctr: 3.8,
    chartData: [
        { name: 'Mon', impressions: 4200, clicks: 160, conversions: 32 },
        { name: 'Tue', impressions: 5100, clicks: 195, conversions: 41 },
        { name: 'Wed', impressions: 4800, clicks: 182, conversions: 38 },
        { name: 'Thu', impressions: 6200, clicks: 240, conversions: 52 },
        { name: 'Fri', impressions: 7100, clicks: 270, conversions: 58 },
        { name: 'Sat', impressions: 5500, clicks: 210, conversions: 44 },
        { name: 'Sun', impressions: 4900, clicks: 188, conversions: 39 },
    ],
};

const teamMembers = [
    { id: '1', name: 'John Doe', email: 'john@adforge.io', role: 'Owner' },
    { id: '2', name: 'Sarah Chen', email: 'sarah@company.com', role: 'Editor' },
    { id: '3', name: 'Mike Rivera', email: 'mike@company.com', role: 'Editor' },
    { id: '4', name: 'Emily Park', email: 'emily@company.com', role: 'Viewer' },
];

// ======================== API Routes ========================

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Auth
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ user, token: `mock-token-${uuidv4()}` });
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
    if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Email already exists' });
    const newUser = { id: uuidv4(), name, email, plan: 'free', avatar: name[0].toUpperCase() };
    users.push(newUser);
    res.status(201).json({ user: newUser, token: `mock-token-${uuidv4()}` });
});

app.post('/api/auth/forgot-password', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    res.json({ message: 'Password reset email sent' });
});

// Projects
app.get('/api/projects', (req, res) => res.json(projects));

app.post('/api/projects', (req, res) => {
    const { name, platform } = req.body;
    const project = { id: uuidv4(), name: name || 'Untitled Project', platform: platform || 'Instagram', status: 'draft', updatedAt: new Date().toISOString(), gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' };
    projects.push(project);
    res.status(201).json(project);
});

app.delete('/api/projects/:id', (req, res) => {
    const idx = projects.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    projects.splice(idx, 1);
    res.json({ message: 'Deleted' });
});

// Templates
app.get('/api/templates', (req, res) => {
    const { category } = req.query;
    const result = category && category !== 'All' ? templates.filter(t => t.category === category) : templates;
    res.json(result);
});

// Brand Kits
app.get('/api/brand-kits', (req, res) => res.json(brandKits));

app.post('/api/brand-kits', (req, res) => {
    const kit = { id: uuidv4(), ...req.body };
    brandKits.push(kit);
    res.status(201).json(kit);
});

// Analytics
app.get('/api/analytics', (req, res) => res.json(analyticsData));

// Team
app.get('/api/team', (req, res) => res.json(teamMembers));

app.post('/api/team/invite', (req, res) => {
    const { email, role } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const newMember = { id: uuidv4(), name: 'Pending', email, role: role || 'Viewer' };
    teamMembers.push(newMember);
    res.status(201).json(newMember);
});

// Billing
app.get('/api/billing', (req, res) => {
    res.json({
        plan: { name: 'Pro', price: 19, period: 'monthly', renewsAt: '2026-03-13' },
        usage: { projects: 18, exports: 47, aiCredits: { used: 230, limit: 500 } },
    });
});

// AI Assistant
app.post('/api/ai/generate', (req, res) => {
    const suggestions = [
        'Unlock Exclusive Deals — Limited Time Only!',
        'Get Started Today — Your First Design is Free',
        'Transform Your Brand With Stunning Ads',
        'Create. Design. Convert. All in One Place.',
        'Try using contrasting colors for better engagement',
    ];
    setTimeout(() => {
        res.json({ suggestion: suggestions[Math.floor(Math.random() * suggestions.length)] });
    }, 500);
});

// 404 handler
app.use('/api/*', (req, res) => res.status(404).json({ error: 'Not found' }));

// Start server
app.listen(PORT, () => {
    console.log(`🚀 AdForge API running on http://localhost:${PORT}`);
});
