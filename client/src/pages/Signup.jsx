import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export default function Signup() {
    const [showPass, setShowPass] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const update = (key, val) => setForm(p => ({ ...p, [key]: val }));

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = '/onboarding';
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-form-container">
                    <Link to="/" className="auth-logo">
                        <div className="auth-logo-icon"><Sparkles size={20} /></div>
                        <span>AdForge</span>
                    </Link>

                    <h1 className="auth-title">Create your account</h1>
                    <p className="auth-subtitle">Start designing high-converting ads today</p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <button type="button" className="auth-social-btn">
                            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                            Continue with Google
                        </button>

                        <div className="auth-divider">or</div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="name">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                                <input id="name" type="text" className="input" placeholder="John Doe" value={form.name} onChange={e => update('name', e.target.value)} style={{ paddingLeft: '36px' }} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="email">Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                                <input id="email" type="email" className="input" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} style={{ paddingLeft: '36px' }} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="password">Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                                <input id="password" type={showPass ? 'text' : 'password'} className="input" placeholder="Min 8 characters" value={form.password} onChange={e => update('password', e.target.value)} style={{ paddingLeft: '36px', paddingRight: '36px' }} />
                                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Create Account</button>

                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textAlign: 'center' }}>
                            By signing up, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
                        </p>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-right-content">
                    <h2>Join 50,000+ Marketers</h2>
                    <p>Create professional ads for every platform. No design experience needed — our AI handles the heavy lifting.</p>
                </div>
            </div>
        </div>
    );
}
