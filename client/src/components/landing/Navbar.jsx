import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [location]);

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'Templates', href: '#showcase' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Testimonials', href: '#testimonials' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <div className="navbar-logo">
                        <Sparkles size={22} />
                    </div>
                    <span className="navbar-brand-text">AdForge</span>
                </Link>

                <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="navbar-link" onClick={() => setMobileOpen(false)}>
                            {link.label}
                        </a>
                    ))}
                    <div className="navbar-links-actions">
                        <Link to="/login" className="btn btn-ghost">Log In</Link>
                        <Link to="/signup" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>

                <div className="navbar-actions">
                    <button className="btn btn-icon theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>
                    <Link to="/login" className="btn btn-ghost navbar-login-desktop">Log In</Link>
                    <Link to="/signup" className="btn btn-primary navbar-cta-desktop">Get Started</Link>
                    <button className="btn btn-icon navbar-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
