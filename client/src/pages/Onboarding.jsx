import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Upload, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import './Auth.css';

const brandColors = [
    '#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B', '#10B981',
    '#3B82F6', '#06B6D4', '#14B8A6', '#84CC16', '#F97316', '#E11D48',
    '#0F172A', '#475569', '#94A3B8', '#1E293B', '#7C3AED', '#2563EB',
];

const fontOptions = [
    { name: 'Inter', style: "'Inter', sans-serif", category: 'Modern' },
    { name: 'Outfit', style: "'Outfit', sans-serif", category: 'Display' },
    { name: 'Georgia', style: "Georgia, serif", category: 'Classic' },
    { name: 'System UI', style: "system-ui, sans-serif", category: 'Clean' },
];

export default function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [brand, setBrand] = useState({ name: '', logo: null, colors: ['#6366F1', '#8B5CF6'], font: 'Inter' });

    const totalSteps = 4;

    const next = () => {
        if (step < totalSteps - 1) setStep(s => s + 1);
        else navigate('/dashboard');
    };
    const prev = () => step > 0 && setStep(s => s - 1);

    const toggleColor = (c) => {
        setBrand(p => ({
            ...p,
            colors: p.colors.includes(c) ? p.colors.filter(x => x !== c) : [...p.colors.slice(0, 3), c]
        }));
    };

    return (
        <div className="onboarding-page">
            <div className="onboarding-card animate-slide-up">
                <div className="onboarding-header">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                        <div className="auth-logo-icon"><Sparkles size={18} /></div>
                    </div>
                    <h2>Set up your brand</h2>
                    <p>Step {step + 1} of {totalSteps}</p>
                </div>

                <div className="onboarding-progress">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                        <div key={i} className={`onboarding-progress-step ${i < step ? 'completed' : ''} ${i === step ? 'active' : ''}`} />
                    ))}
                </div>

                <div className="onboarding-step" key={step}>
                    {step === 0 && (
                        <>
                            <h3>What's your brand name?</h3>
                            <div className="input-group">
                                <label className="input-label" htmlFor="brand-name">Brand Name</label>
                                <input id="brand-name" type="text" className="input" placeholder="e.g. Acme Studio" value={brand.name} onChange={e => setBrand(p => ({ ...p, name: e.target.value }))} autoFocus />
                            </div>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <h3>Upload your logo</h3>
                            <div className="upload-zone">
                                <Upload size={32} style={{ margin: '0 auto var(--space-3)', opacity: 0.5 }} />
                                <p>Drag & drop or click to upload</p>
                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>SVG, PNG, or JPG (max 2MB)</span>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h3>Choose brand colors</h3>
                            <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '-var(--space-3)' }}>
                                Select up to 4 colors
                            </p>
                            <div className="color-picker-grid">
                                {brandColors.map(c => (
                                    <div
                                        key={c}
                                        className={`color-swatch ${brand.colors.includes(c) ? 'selected' : ''}`}
                                        style={{ background: c }}
                                        onClick={() => toggleColor(c)}
                                    />
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center' }}>
                                {brand.colors.map(c => (
                                    <div key={c} style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: c, border: '2px solid var(--border-primary)' }} />
                                ))}
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h3>Select font style</h3>
                            <div className="font-options-grid">
                                {fontOptions.map(f => (
                                    <div
                                        key={f.name}
                                        className={`font-option ${brand.font === f.name ? 'selected' : ''}`}
                                        onClick={() => setBrand(p => ({ ...p, font: f.name }))}
                                    >
                                        <div style={{ fontFamily: f.style, fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Aa</div>
                                        <div style={{ fontWeight: 600 }}>{f.name}</div>
                                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{f.category}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="onboarding-actions">
                    {step > 0 ? (
                        <button className="btn btn-secondary" onClick={prev}><ArrowLeft size={16} /> Back</button>
                    ) : (
                        <div />
                    )}
                    <button className="btn btn-primary" onClick={next}>
                        {step < totalSteps - 1 ? (
                            <>Next <ArrowRight size={16} /></>
                        ) : (
                            <>Finish <Check size={16} /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
