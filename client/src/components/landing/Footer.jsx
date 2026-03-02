import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    const footerLinks = {
        Product: [
            { label: 'Features', href: '#features' },
            { label: 'Templates', href: '/templates' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Editor', href: '/editor' },
        ],
        Company: [
            { label: 'About', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Contact', href: '#' },
        ],
        Resources: [
            { label: 'Help Center', href: '#' },
            { label: 'API Docs', href: '#' },
            { label: 'Community', href: '#' },
            { label: 'Tutorials', href: '#' },
        ],
        Legal: [
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' },
            { label: 'Cookie Policy', href: '#' },
            { label: 'GDPR', href: '#' },
        ],
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="footer-logo-icon">
                                <Sparkles size={20} />
                            </div>
                            <span>AdForge</span>
                        </Link>
                        <p className="footer-description">
                            AI-powered ad design platform for marketers and brands. Create stunning ads in minutes.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="footer-social" aria-label="Twitter"><Twitter size={18} /></a>
                            <a href="#" className="footer-social" aria-label="GitHub"><Github size={18} /></a>
                            <a href="#" className="footer-social" aria-label="LinkedIn"><Linkedin size={18} /></a>
                            <a href="#" className="footer-social" aria-label="Instagram"><Instagram size={18} /></a>
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="footer-column">
                            <h4 className="footer-column-title">{category}</h4>
                            <ul className="footer-column-links">
                                {links.map(link => (
                                    <li key={link.label}>
                                        {link.href.startsWith('/') ? (
                                            <Link to={link.href} className="footer-link">{link.label}</Link>
                                        ) : (
                                            <a href={link.href} className="footer-link">{link.label}</a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} AdForge. All rights reserved.</p>
                    <p>Designed with care for creators everywhere.</p>
                </div>
            </div>
        </footer>
    );
}
