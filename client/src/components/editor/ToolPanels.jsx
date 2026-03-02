import { useState, useRef } from 'react';
import {
    Search, X, Star, Heart, Triangle, Hexagon, Pentagon, Octagon,
    Circle, Square, Diamond, Minus, ArrowRight, Play, Music,
    CloudUpload, Check, Palette, Brush, Type
} from 'lucide-react';

// ==================== STOCK IMAGES ====================
const stockImages = [
    { id: 1, url: 'https://picsum.photos/seed/ad1/400/300', label: 'Business Meeting' },
    { id: 2, url: 'https://picsum.photos/seed/ad2/400/300', label: 'Marketing Team' },
    { id: 3, url: 'https://picsum.photos/seed/ad3/400/300', label: 'Technology' },
    { id: 4, url: 'https://picsum.photos/seed/ad4/400/300', label: 'Product Shot' },
    { id: 5, url: 'https://picsum.photos/seed/ad5/400/300', label: 'Food & Drink' },
    { id: 6, url: 'https://picsum.photos/seed/ad6/400/300', label: 'Nature' },
    { id: 7, url: 'https://picsum.photos/seed/ad7/400/300', label: 'Fashion' },
    { id: 8, url: 'https://picsum.photos/seed/ad8/400/300', label: 'Sports' },
    { id: 9, url: 'https://picsum.photos/seed/ad9/400/300', label: 'Travel' },
    { id: 10, url: 'https://picsum.photos/seed/ad10/400/300', label: 'Abstract' },
    { id: 11, url: 'https://picsum.photos/seed/ad11/400/300', label: 'Workspace' },
    { id: 12, url: 'https://picsum.photos/seed/ad12/400/300', label: 'Celebration' },
];

// ==================== SHAPES DATA ====================
const shapeOptions = [
    { id: 'rect', label: 'Rectangle', icon: <Square size={28} />, borderRadius: 0 },
    { id: 'rounded', label: 'Rounded Rect', icon: <Square size={28} style={{ borderRadius: 6 }} />, borderRadius: 16 },
    { id: 'circle', label: 'Circle', icon: <Circle size={28} />, borderRadius: 999 },
    { id: 'diamond', label: 'Diamond', icon: <Diamond size={28} />, borderRadius: 0, rotate: 45 },
    { id: 'line-h', label: 'Line', icon: <Minus size={28} />, isLine: true, lineDir: 'h' },
    { id: 'arrow', label: 'Arrow', icon: <ArrowRight size={28} />, isLine: true, lineDir: 'arrow' },
    { id: 'triangle', label: 'Triangle', icon: <Triangle size={28} />, isTriangle: true },
    { id: 'hexagon', label: 'Hexagon', icon: <Hexagon size={28} />, isPolygon: 'hexagon' },
    { id: 'pentagon', label: 'Pentagon', icon: <Pentagon size={28} />, isPolygon: 'pentagon' },
    { id: 'octagon', label: 'Octagon', icon: <Octagon size={28} />, isPolygon: 'octagon' },
    { id: 'star', label: 'Star', icon: <Star size={28} />, isPolygon: 'star' },
    { id: 'heart', label: 'Heart', icon: <Heart size={28} />, isPolygon: 'heart' },
];

// ==================== ICON DATA ====================
const iconOptions = [
    { id: 'star', label: 'Star', svg: '★' },
    { id: 'heart', label: 'Heart', svg: '♥' },
    { id: 'check', label: 'Checkmark', svg: '✔' },
    { id: 'arrow-r', label: 'Arrow Right', svg: '→' },
    { id: 'arrow-d', label: 'Arrow Down', svg: '↓' },
    { id: 'fire', label: 'Fire', svg: '🔥' },
    { id: 'lightning', label: 'Lightning', svg: '⚡' },
    { id: 'sparkle', label: 'Sparkle', svg: '✨' },
    { id: 'trophy', label: 'Trophy', svg: '🏆' },
    { id: 'rocket', label: 'Rocket', svg: '🚀' },
    { id: 'gift', label: 'Gift', svg: '🎁' },
    { id: 'tag', label: 'Tag', svg: '🏷️' },
    { id: 'clock', label: 'Clock', svg: '⏰' },
    { id: 'money', label: 'Money', svg: '💰' },
    { id: 'thumbsup', label: 'Thumbs Up', svg: '👍' },
    { id: 'crown', label: 'Crown', svg: '👑' },
    { id: 'megaphone', label: 'Megaphone', svg: '📢' },
    { id: 'chart', label: 'Chart', svg: '📊' },
    { id: 'target', label: 'Target', svg: '🎯' },
    { id: 'medal', label: 'Medal', svg: '🥇' },
];

// ==================== VIDEO PLACEHOLDERS ====================
const videoOptions = [
    { id: 1, label: 'Product Demo', duration: '0:15', gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' },
    { id: 2, label: 'Brand Intro', duration: '0:10', gradient: 'linear-gradient(135deg, #EC4899, #F43F5E)' },
    { id: 3, label: 'Testimonial', duration: '0:30', gradient: 'linear-gradient(135deg, #10B981, #059669)' },
    { id: 4, label: 'Sale Countdown', duration: '0:05', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
    { id: 5, label: 'Motion BG', duration: '0:08', gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' },
    { id: 6, label: 'Logo Reveal', duration: '0:06', gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)' },
];

// ==================== BACKGROUNDS ====================
const bgGradients = [
    { id: 1, label: 'Indigo Violet', value: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A78BFA)' },
    { id: 2, label: 'Sunset', value: 'linear-gradient(135deg, #F97316, #EF4444, #EC4899)' },
    { id: 3, label: 'Ocean', value: 'linear-gradient(135deg, #06B6D4, #3B82F6, #6366F1)' },
    { id: 4, label: 'Forest', value: 'linear-gradient(135deg, #10B981, #059669, #047857)' },
    { id: 5, label: 'Midnight', value: 'linear-gradient(135deg, #0F172A, #1E293B, #334155)' },
    { id: 6, label: 'Rose Gold', value: 'linear-gradient(135deg, #F43F5E, #EC4899, #D946EF)' },
    { id: 7, label: 'Warm', value: 'linear-gradient(135deg, #F59E0B, #F97316, #EF4444)' },
    { id: 8, label: 'Cool', value: 'linear-gradient(135deg, #818CF8, #6366F1, #4F46E5)' },
    { id: 9, label: 'Dawn', value: 'linear-gradient(135deg, #FDE68A, #FDBA74, #FCA5A5)' },
    { id: 10, label: 'Northern Lights', value: 'linear-gradient(135deg, #22D3EE, #818CF8, #D946EF)' },
];
const bgSolids = ['#FFFFFF', '#0F172A', '#1E293B', '#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#F97316', '#D946EF'];

// ==================== TEMPLATES ====================
const templateOptions = [
    {
        id: 1, name: 'Sale Banner', elements: [
            { type: 'text', content: 'BIG SALE', x: 100, y: 60, w: 320, h: 70, fontSize: 48, fontWeight: 900, color: '#FFFFFF' },
            { type: 'text', content: 'Up to 70% OFF', x: 130, y: 150, w: 260, h: 40, fontSize: 24, fontWeight: 600, color: '#FFD93D' },
            { type: 'shape', content: '', x: 150, y: 220, w: 220, h: 44, color: '#FFFFFF', borderRadius: 22 },
            { type: 'text', content: 'Shop Now', x: 200, y: 228, w: 120, h: 28, fontSize: 16, fontWeight: 700, color: '#6366F1' },
        ], bg: 'linear-gradient(135deg, #EF4444, #B91C1C)', gradient: 'linear-gradient(135deg, #EF4444, #B91C1C)'
    },
    {
        id: 2, name: 'Product Launch', elements: [
            { type: 'text', content: 'NEW ARRIVAL', x: 80, y: 50, w: 360, h: 50, fontSize: 36, fontWeight: 800, color: '#FFFFFF' },
            { type: 'text', content: 'Introducing Our Latest Product', x: 80, y: 120, w: 360, h: 30, fontSize: 16, fontWeight: 400, color: '#C4B5FD' },
            { type: 'shape', content: '', x: 160, y: 200, w: 200, h: 200, color: 'rgba(255,255,255,0.1)', borderRadius: 100 },
            { type: 'text', content: 'Learn More →', x: 170, y: 420, w: 180, h: 28, fontSize: 16, fontWeight: 600, color: '#FFFFFF' },
        ], bg: 'linear-gradient(135deg, #6366F1, #8B5CF6)', gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
    },
    {
        id: 3, name: 'Event Invite', elements: [
            { type: 'text', content: "YOU'RE INVITED", x: 90, y: 60, w: 340, h: 50, fontSize: 32, fontWeight: 800, color: '#FFFFFF' },
            { type: 'text', content: 'Annual Conference 2026', x: 100, y: 130, w: 320, h: 36, fontSize: 22, fontWeight: 600, color: '#FDE68A' },
            { type: 'text', content: 'March 15, 2026 • 10:00 AM', x: 120, y: 190, w: 280, h: 24, fontSize: 14, fontWeight: 400, color: '#D1D5DB' },
            { type: 'shape', content: '', x: 150, y: 250, w: 220, h: 44, color: '#F59E0B', borderRadius: 22 },
            { type: 'text', content: 'Register Now', x: 185, y: 258, w: 150, h: 28, fontSize: 15, fontWeight: 700, color: '#0F172A' },
        ], bg: 'linear-gradient(135deg, #0F172A, #1E293B)', gradient: 'linear-gradient(135deg, #0F172A, #1E293B)'
    },
    {
        id: 4, name: 'Minimal CTA', elements: [
            { type: 'text', content: 'Simple.', x: 120, y: 100, w: 280, h: 60, fontSize: 42, fontWeight: 800, color: '#0F172A' },
            { type: 'text', content: 'Powerful. Beautiful.', x: 120, y: 170, w: 280, h: 36, fontSize: 22, fontWeight: 500, color: '#6366F1' },
            { type: 'shape', content: '', x: 120, y: 260, w: 180, h: 44, color: '#6366F1', borderRadius: 8 },
            { type: 'text', content: 'Get Started', x: 152, y: 268, w: 120, h: 28, fontSize: 15, fontWeight: 600, color: '#FFFFFF' },
        ], bg: '#FFFFFF', gradient: 'linear-gradient(135deg, #F8F9FC, #FFFFFF)'
    },
    {
        id: 5, name: 'Flash Sale', elements: [
            { type: 'text', content: '⚡ FLASH SALE ⚡', x: 70, y: 50, w: 380, h: 50, fontSize: 32, fontWeight: 900, color: '#FFFFFF' },
            { type: 'text', content: '24 HOURS ONLY', x: 140, y: 120, w: 240, h: 30, fontSize: 18, fontWeight: 700, color: '#FDE68A' },
            { type: 'text', content: '50%', x: 170, y: 180, w: 180, h: 100, fontSize: 80, fontWeight: 900, color: '#FFFFFF' },
            { type: 'text', content: 'OFF EVERYTHING', x: 130, y: 290, w: 260, h: 30, fontSize: 20, fontWeight: 700, color: '#FDE68A' },
            { type: 'shape', content: '', x: 140, y: 350, w: 240, h: 48, color: '#FFFFFF', borderRadius: 24 },
            { type: 'text', content: 'Grab The Deal →', x: 165, y: 358, w: 190, h: 30, fontSize: 16, fontWeight: 700, color: '#EF4444' },
        ], bg: 'linear-gradient(135deg, #F97316, #EF4444)', gradient: 'linear-gradient(135deg, #F97316, #EF4444)'
    },
    {
        id: 6, name: 'App Download', elements: [
            { type: 'text', content: 'Download Our App', x: 90, y: 60, w: 340, h: 50, fontSize: 32, fontWeight: 800, color: '#FFFFFF' },
            { type: 'text', content: 'Available on iOS & Android', x: 120, y: 130, w: 280, h: 24, fontSize: 14, fontWeight: 400, color: '#A5B4FC' },
            { type: 'shape', content: '', x: 100, y: 200, w: 160, h: 48, color: '#FFFFFF', borderRadius: 10 },
            { type: 'text', content: '▶ App Store', x: 118, y: 210, w: 130, h: 28, fontSize: 14, fontWeight: 600, color: '#0F172A' },
            { type: 'shape', content: '', x: 280, y: 200, w: 160, h: 48, color: 'rgba(255,255,255,0.2)', borderRadius: 10 },
            { type: 'text', content: '▶ Google Play', x: 295, y: 210, w: 130, h: 28, fontSize: 14, fontWeight: 600, color: '#FFFFFF' },
        ], bg: 'linear-gradient(135deg, #4F46E5, #6366F1)', gradient: 'linear-gradient(135deg, #4F46E5, #6366F1)'
    },
];

// ==================== BRAND ASSETS ====================
const brandColors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#0F172A', '#FFFFFF'];
const brandFonts = ['Outfit', 'Inter', 'Georgia', 'Courier New', 'Arial Black'];

// ==================== PANEL COMPONENTS ====================

export function TextPanel({ onAddElement }) {
    const presets = [
        { label: 'Heading', fontSize: 42, fontWeight: 800, content: 'Add a heading' },
        { label: 'Subheading', fontSize: 24, fontWeight: 600, content: 'Add a subheading' },
        { label: 'Body Text', fontSize: 16, fontWeight: 400, content: 'Add body text' },
        { label: 'Caption', fontSize: 12, fontWeight: 500, content: 'Add caption text' },
        { label: 'CTA Button Text', fontSize: 16, fontWeight: 700, content: 'Click Here' },
    ];
    return (
        <div className="tool-panel">
            <div className="tool-panel-header"><h3>Text</h3></div>
            <div className="tool-panel-body">
                <p className="tool-panel-hint">Click to add text to canvas</p>
                {presets.map((p, i) => (
                    <button key={i} className="tool-panel-item text-preset" onClick={() => onAddElement({
                        type: 'text', content: p.content, w: 280, h: Math.max(30, p.fontSize * 1.5),
                        fontSize: p.fontSize, fontWeight: p.fontWeight, color: '#FFFFFF'
                    })} style={{ fontSize: Math.min(p.fontSize * 0.6, 20), fontWeight: p.fontWeight }}>
                        {p.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export function ImagesPanel({ onAddElement }) {
    const [search, setSearch] = useState('');
    const filtered = stockImages.filter(img => img.label.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className="tool-panel">
            <div className="tool-panel-header"><h3>Images</h3></div>
            <div className="tool-panel-search">
                <Search size={14} />
                <input placeholder="Search images..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="tool-panel-body">
                <div className="tool-panel-grid-2">
                    {filtered.map(img => (
                        <div key={img.id} className="tool-panel-img-card" onClick={() => onAddElement({
                            type: 'image', content: img.url, w: 200, h: 150, color: 'transparent', label: img.label
                        })}>
                            <img src={img.url} alt={img.label} loading="lazy" />
                            <span>{img.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function ShapesPanel({ onAddElement }) {
    const [color, setColor] = useState('#6366F1');
    return (
        <div className="tool-panel">
            <div className="tool-panel-header"><h3>Shapes</h3></div>
            <div className="tool-panel-body">
                <div className="tool-panel-color-row">
                    <label>Fill Color</label>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                </div>
                <div className="tool-panel-grid-3">
                    {shapeOptions.map(s => (
                        <button key={s.id} className="tool-panel-shape-btn" title={s.label} onClick={() => {
                            const el = {
                                type: 'shape', content: '', w: s.isLine ? 200 : 120, h: s.isLine ? 4 : 120, color,
                                borderRadius: s.borderRadius || 0, shapeType: s.id, rotate: s.rotate || 0,
                                isTriangle: s.isTriangle || false, isPolygon: s.isPolygon || false, isLine: s.isLine || false, lineDir: s.lineDir || ''
                            };
                            onAddElement(el);
                        }}>
                            {s.icon}
                            <span>{s.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function IconsPanel({ onAddElement }) {
    const [search, setSearch] = useState('');
    const filtered = iconOptions.filter(ic => ic.label.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className="tool-panel">
            <div className="tool-panel-header"><h3>Icons</h3></div>
            <div className="tool-panel-search">
                <Search size={14} />
                <input placeholder="Search icons..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="tool-panel-body">
                <div className="tool-panel-grid-4">
                    {filtered.map(ic => (
                        <button key={ic.id} className="tool-panel-icon-btn" title={ic.label} onClick={() => onAddElement({
                            type: 'icon', content: ic.svg, w: 60, h: 60, fontSize: 40, color: '#FFFFFF'
                        })}>
                            <span style={{ fontSize: 28 }}>{ic.svg}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function VideosPanel({ onAddElement }) {
    return (
        <div className="tool-panel">
            <div className="tool-panel-header"><h3>Videos</h3></div>
            <div className="tool-panel-body">
                <p className="tool-panel-hint">Add video placeholders to your design</p>
                <div className="tool-panel-grid-2">
                    {videoOptions.map(v => (
                        <div key={v.id} className="tool-panel-video-card" onClick={() => onAddElement({
                            type: 'video', content: v.label, w: 240, h: 160, color: v.gradient, label: v.label
                        })}>
                            <div className="tool-panel-video-thumb" style={{ background: v.gradient }}>
                                <Play size={24} fill="white" color="white" />
                            </div>
                            <div className="tool-panel-video-info">
                                <span>{v.label}</span>
                                <span className="tool-panel-video-dur">{v.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function BackgroundsPanel({ canvasBg, onChangeBg }) {
    const [customColor, setCustomColor] = useState('#6366F1');
    return (
        <div className="tool-panel">
            <div className="tool-panel-header"><h3>Backgrounds</h3></div>
            <div className="tool-panel-body">
                <h4 className="tool-panel-subtitle">Gradients</h4>
                <div className="tool-panel-grid-2">
                    {bgGradients.map(g => (
                        <div key={g.id} className={`tool-panel-bg-swatch ${canvasBg === g.value ? 'active' : ''}`}
                            style={{ background: g.value }} onClick={() => onChangeBg(g.value)} title={g.label}>
                            {canvasBg === g.value && <Check size={18} color="white" />}
                        </div>
                    ))}
                </div>
                <h4 className="tool-panel-subtitle" style={{ marginTop: 16 }}>Solid Colors</h4>
                <div className="tool-panel-grid-4">
                    {bgSolids.map((c, i) => (
                        <div key={i} className={`tool-panel-bg-circle ${canvasBg === c ? 'active' : ''}`}
                            style={{ background: c, border: c === '#FFFFFF' ? '2px solid var(--border-primary)' : 'none' }}
                            onClick={() => onChangeBg(c)}>
                            {canvasBg === c && <Check size={12} color={c === '#FFFFFF' ? '#000' : '#fff'} />}
                        </div>
                    ))}
                </div>
                <h4 className="tool-panel-subtitle" style={{ marginTop: 16 }}>Custom</h4>
                <div className="tool-panel-color-row">
                    <input type="color" value={customColor} onChange={e => setCustomColor(e.target.value)} />
                    <button className="btn btn-primary btn-sm" onClick={() => onChangeBg(customColor)}>Apply</button>
                </div>
            </div>
        </div>
    );
}

export function TemplatesPanel({ onApplyTemplate }) {
    return (
        <div className="tool-panel">
            <div className="tool-panel-header"><h3>Templates</h3></div>
            <div className="tool-panel-body">
                <p className="tool-panel-hint">Click a template to apply it (replaces current canvas)</p>
                <div className="tool-panel-grid-2">
                    {templateOptions.map(t => (
                        <div key={t.id} className="tool-panel-template-card" onClick={() => onApplyTemplate(t)}>
                            <div className="tool-panel-template-thumb" style={{ background: t.gradient }}>
                                <span>{t.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function UploadsPanel({ onAddElement }) {
    const fileRef = useRef(null);
    const [uploads, setUploads] = useState([]);
    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };
    const handleFiles = (files) => {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const dataUrl = ev.target.result;
                setUploads(prev => [...prev, { id: Date.now() + Math.random(), url: dataUrl, name: file.name }]);
            };
            reader.readAsDataURL(file);
        });
    };
    return (
        <div className="tool-panel">
            <div className="tool-panel-header"><h3>Uploads</h3></div>
            <div className="tool-panel-body">
                <div className="tool-panel-dropzone" onDrop={handleDrop} onDragOver={e => e.preventDefault()}
                    onClick={() => fileRef.current?.click()}>
                    <CloudUpload size={32} />
                    <span>Drag & drop or click to upload</span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>PNG, JPG, SVG, GIF</span>
                    <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={e => handleFiles(e.target.files)} />
                </div>
                {uploads.length > 0 && (
                    <div className="tool-panel-grid-2" style={{ marginTop: 12 }}>
                        {uploads.map(u => (
                            <div key={u.id} className="tool-panel-img-card" onClick={() => onAddElement({
                                type: 'image', content: u.url, w: 200, h: 150, color: 'transparent', label: u.name
                            })}>
                                <img src={u.url} alt={u.name} />
                                <span>{u.name.substring(0, 15)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function BrandPanel({ onAddElement, onChangeBg }) {
    return (
        <div className="tool-panel">
            <div className="tool-panel-header"><h3>Brand Assets</h3></div>
            <div className="tool-panel-body">
                <h4 className="tool-panel-subtitle">Brand Colors</h4>
                <div className="tool-panel-grid-4">
                    {brandColors.map((c, i) => (
                        <div key={i} className="tool-panel-bg-circle" style={{ background: c, border: c === '#FFFFFF' ? '2px solid var(--border-primary)' : 'none', cursor: 'pointer' }}
                            onClick={() => onChangeBg(c)} title={`Set as background: ${c}`} />
                    ))}
                </div>
                <h4 className="tool-panel-subtitle" style={{ marginTop: 16 }}>Brand Fonts</h4>
                {brandFonts.map((f, i) => (
                    <button key={i} className="tool-panel-item" style={{ fontFamily: f }} onClick={() => onAddElement({
                        type: 'text', content: `${f} Sample`, w: 240, h: 36, fontSize: 22, fontWeight: 600, color: '#FFFFFF', fontFamily: f
                    })}>
                        <Type size={14} /> {f}
                    </button>
                ))}
                <h4 className="tool-panel-subtitle" style={{ marginTop: 16 }}>Quick Add</h4>
                <button className="tool-panel-item" onClick={() => onAddElement({
                    type: 'text', content: 'AdForge', w: 200, h: 40, fontSize: 28, fontWeight: 800, color: '#6366F1'
                })}><Brush size={14} /> Logo Text</button>
                <button className="tool-panel-item" onClick={() => onAddElement({
                    type: 'text', content: 'adforge.io', w: 160, h: 24, fontSize: 14, fontWeight: 500, color: '#94A3B8'
                })}><Palette size={14} /> Website URL</button>
            </div>
        </div>
    );
}
