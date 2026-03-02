import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import {
    Sparkles, Layout, Palette, Type, Wand2, Video, BarChart3,
    ChevronRight, Star, ArrowRight, Check, Play, Zap, Users, Globe,
    MousePointerClick, Layers, ImagePlus
} from 'lucide-react';
import './Landing.css';

const features = [
    { icon: <Layout size={24} />, title: 'Drag & Drop Editor', desc: 'Intuitive canvas editor with snap-to-grid, alignment guides, and real-time element manipulation.' },
    { icon: <Layers size={24} />, title: '1000+ Ad Templates', desc: 'Professional templates for every platform — Instagram, Facebook, Google, LinkedIn, and more.' },
    { icon: <Palette size={24} />, title: 'Brand Kits', desc: 'Save your brand colors, fonts, and logos. Apply them instantly across all your designs.' },
    { icon: <Wand2 size={24} />, title: 'AI Copy Generator', desc: 'Generate compelling headlines, CTAs, and ad copy with our AI-powered writing assistant.' },
    { icon: <Video size={24} />, title: 'Animation & Video', desc: 'Add motion to your ads with timeline-based animations. Export as MP4 or GIF.' },
    { icon: <BarChart3 size={24} />, title: 'Analytics & A/B Testing', desc: 'Track impressions, CTR, and conversions. Compare ad variations side by side.' },
];

const steps = [
    { num: '01', title: 'Choose Template', desc: 'Browse our library of 1000+ professionally designed ad templates or start from scratch.', icon: <MousePointerClick size={28} /> },
    { num: '02', title: 'Customize Design', desc: 'Use our drag-and-drop editor to make it yours. Add text, images, your brand assets, and more.', icon: <ImagePlus size={28} /> },
    { num: '03', title: 'Export & Launch', desc: 'Download in any format — PNG, JPG, PDF, GIF, or MP4. Ready for any platform instantly.', icon: <Zap size={28} /> },
];

const showcaseAds = [
    { title: 'Summer Sale', platform: 'Instagram', color: '#FF6B6B' },
    { title: 'Product Launch', platform: 'Facebook', color: '#6366F1' },
    { title: 'Brand Awareness', platform: 'Google', color: '#10B981' },
    { title: 'Lead Gen', platform: 'LinkedIn', color: '#3B82F6' },
    { title: 'Flash Deal', platform: 'Instagram', color: '#F59E0B' },
    { title: 'Event Promo', platform: 'Facebook', color: '#8B5CF6' },
];

const pricingPlans = [
    {
        name: 'Free', price: '$0', period: '/month', badge: '',
        desc: 'Perfect for trying out AdForge',
        features: ['5 projects', '50+ templates', 'Basic editor', 'PNG export', 'Watermark on exports'],
        cta: 'Get Started Free', popular: false,
    },
    {
        name: 'Pro', price: '$19', period: '/month', badge: 'Most Popular',
        desc: 'For marketers and growing brands',
        features: ['Unlimited projects', '1000+ templates', 'Full editor + AI', 'All export formats', 'Brand kits', 'No watermark', 'Priority support'],
        cta: 'Start Pro Trial', popular: true,
    },
    {
        name: 'Business', price: '$49', period: '/month', badge: '',
        desc: 'For teams and agencies',
        features: ['Everything in Pro', 'Team collaboration', 'Analytics dashboard', 'A/B testing', 'Custom templates', 'API access', 'Dedicated support'],
        cta: 'Contact Sales', popular: false,
    },
];

const testimonials = [
    { name: 'Sarah Chen', role: 'Marketing Director', company: 'TechFlow', text: 'AdForge cuts our ad creation time by 80%. The AI copy generator is incredibly accurate and the templates are stunning.', rating: 5 },
    { name: 'Marcus Rivera', role: 'Founder', company: 'GrowthLab', text: 'We switched from Canva to AdForge and never looked back. The brand kit integration alone saves us hours every week.', rating: 5 },
    { name: 'Emily Park', role: 'Creative Lead', company: 'MediaPulse', text: 'The best ad design tool for teams. Real-time collaboration, version history, and the analytics are game-changing.', rating: 5 },
];

export default function Landing() {
    return (
        <div className="landing">
            <Navbar />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg-gradient" />
                <div className="container hero-container">
                    <div className="hero-content animate-slide-up">
                        <div className="hero-badge">
                            <Sparkles size={14} />
                            <span>AI-Powered Ad Creation Platform</span>
                        </div>
                        <h1 className="hero-title">
                            Design High-Converting<br />
                            <span className="text-gradient">Ads in Minutes</span>
                        </h1>
                        <p className="hero-subtitle">
                            Create stunning advertisements for Instagram, Facebook, Google, and more.
                            Powered by AI, loved by 50,000+ marketers worldwide.
                        </p>
                        <div className="hero-actions">
                            <Link to="/signup" className="btn btn-primary btn-lg">
                                Start Designing <ArrowRight size={18} />
                            </Link>
                            <Link to="/templates" className="btn btn-secondary btn-lg">
                                <Play size={16} /> View Templates
                            </Link>
                        </div>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <strong>50K+</strong><span>Marketers</span>
                            </div>
                            <div className="hero-stat-divider" />
                            <div className="hero-stat">
                                <strong>1M+</strong><span>Ads Created</span>
                            </div>
                            <div className="hero-stat-divider" />
                            <div className="hero-stat">
                                <strong>4.9</strong><span>Rating</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual animate-fade-in">
                        <div className="hero-mockup">
                            <div className="hero-mockup-header">
                                <div className="hero-mockup-dots">
                                    <span /><span /><span />
                                </div>
                                <span className="hero-mockup-title">AdForge Editor</span>
                            </div>
                            <div className="hero-mockup-body">
                                <div className="hero-mockup-sidebar">
                                    <div className="hero-mockup-tool" />
                                    <div className="hero-mockup-tool" />
                                    <div className="hero-mockup-tool" />
                                    <div className="hero-mockup-tool" />
                                </div>
                                <div className="hero-mockup-canvas">
                                    <div className="hero-mockup-element hero-mockup-el-1">Summer Sale</div>
                                    <div className="hero-mockup-element hero-mockup-el-2">50% OFF</div>
                                    <div className="hero-mockup-element hero-mockup-el-3">Shop Now</div>
                                </div>
                                <div className="hero-mockup-props">
                                    <div className="hero-mockup-prop-item" />
                                    <div className="hero-mockup-prop-item" />
                                    <div className="hero-mockup-prop-item short" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section features-section" id="features">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge"><Zap size={14} /> Features</span>
                        <h2 className="section-title">Everything You Need to<br /><span className="text-gradient">Create Stunning Ads</span></h2>
                        <p className="section-subtitle">Powerful tools designed for speed, creativity, and results.</p>
                    </div>
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-card card card-interactive">
                                <div className="card-body">
                                    <div className="feature-icon">{f.icon}</div>
                                    <h3 className="feature-title">{f.title}</h3>
                                    <p className="feature-desc">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section steps-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge"><Play size={14} /> How It Works</span>
                        <h2 className="section-title">Create Ads in<br /><span className="text-gradient">3 Simple Steps</span></h2>
                    </div>
                    <div className="steps-grid">
                        {steps.map((s, i) => (
                            <div key={i} className="step-card">
                                <div className="step-icon-wrapper">
                                    <div className="step-icon">{s.icon}</div>
                                    <span className="step-num">{s.num}</span>
                                </div>
                                <h3 className="step-title">{s.title}</h3>
                                <p className="step-desc">{s.desc}</p>
                                {i < steps.length - 1 && <div className="step-connector"><ChevronRight size={20} /></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase Gallery */}
            <section className="section showcase-section" id="showcase">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge"><Globe size={14} /> Showcase</span>
                        <h2 className="section-title">Ads That <span className="text-gradient">Convert</span></h2>
                        <p className="section-subtitle">Examples created with AdForge by real marketers.</p>
                    </div>
                    <div className="showcase-grid">
                        {showcaseAds.map((ad, i) => (
                            <div key={i} className="showcase-card" style={{ '--card-accent': ad.color }}>
                                <div className="showcase-thumb">
                                    <div className="showcase-overlay">
                                        <span className="badge badge-primary">{ad.platform}</span>
                                    </div>
                                </div>
                                <div className="showcase-info">
                                    <h4>{ad.title}</h4>
                                    <span>{ad.platform} Ad</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="section pricing-section" id="pricing">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge"><Star size={14} /> Pricing</span>
                        <h2 className="section-title">Simple, Transparent <span className="text-gradient">Pricing</span></h2>
                        <p className="section-subtitle">Start free. Upgrade when you're ready.</p>
                    </div>
                    <div className="pricing-grid">
                        {pricingPlans.map((plan, i) => (
                            <div key={i} className={`pricing-card card ${plan.popular ? 'pricing-popular' : ''}`}>
                                <div className="card-body">
                                    {plan.badge && <span className="badge badge-primary pricing-badge">{plan.badge}</span>}
                                    <h3 className="pricing-name">{plan.name}</h3>
                                    <p className="pricing-desc">{plan.desc}</p>
                                    <div className="pricing-price">
                                        <span className="pricing-amount">{plan.price}</span>
                                        <span className="pricing-period">{plan.period}</span>
                                    </div>
                                    <Link to="/signup" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} pricing-cta`}>
                                        {plan.cta}
                                    </Link>
                                    <ul className="pricing-features">
                                        {plan.features.map((f, j) => (
                                            <li key={j}><Check size={16} className="pricing-check" />{f}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section testimonials-section" id="testimonials">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge"><Users size={14} /> Testimonials</span>
                        <h2 className="section-title">Loved by <span className="text-gradient">50,000+ Marketers</span></h2>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card card">
                                <div className="card-body">
                                    <div className="testimonial-stars">
                                        {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="testimonial-text">"{t.text}"</p>
                                    <div className="testimonial-author">
                                        <div className="avatar">{t.name[0]}</div>
                                        <div>
                                            <strong>{t.name}</strong>
                                            <span>{t.role}, {t.company}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2 className="cta-title">Ready to Create Ads That Convert?</h2>
                        <p className="cta-subtitle">Join 50,000+ marketers using AdForge to create stunning ads. Start free, no credit card required.</p>
                        <div className="cta-actions">
                            <Link to="/signup" className="btn btn-primary btn-lg">
                                Start Designing Free <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
