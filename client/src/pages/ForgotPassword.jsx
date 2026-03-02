import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowLeft } from 'lucide-react';
import './Auth.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-form-container">
                    <Link to="/" className="auth-logo">
                        <div className="auth-logo-icon"><Sparkles size={20} /></div>
                        <span>AdForge</span>
                    </Link>

                    {!sent ? (
                        <>
                            <h1 className="auth-title">Reset password</h1>
                            <p className="auth-subtitle">Enter your email and we'll send reset instructions</p>

                            <form className="auth-form" onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="email">Email</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                                        <input id="email" type="email" className="input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ paddingLeft: '36px' }} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Send Reset Link</button>
                            </form>
                        </>
                    ) : (
                        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)', color: 'var(--success)' }}>
                                <Mail size={28} />
                            </div>
                            <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>Check your email</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                                We've sent a reset link to <strong>{email}</strong>
                            </p>
                            <button onClick={() => setSent(false)} className="btn btn-secondary">Try another email</button>
                        </div>
                    )}

                    <div className="auth-footer">
                        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowLeft size={14} /> Back to sign in
                        </Link>
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-right-content">
                    <h2>We've Got You</h2>
                    <p>It happens to the best of us. We'll help you get back into your account.</p>
                </div>
            </div>
        </div>
    );
}
