import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Sparkles, ArrowLeft, Undo2, Redo2, ZoomIn, ZoomOut, Download, Eye, Save,
    Type, Image, Square, Circle, Video, Palette, Layout, Upload, Brush,
    Wand2, ChevronDown, Move, Trash2, Copy, Lock, Unlock, EyeOff, Layers,
    AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Send, X, Play
} from 'lucide-react';
import {
    TextPanel, ImagesPanel, ShapesPanel, IconsPanel, VideosPanel,
    BackgroundsPanel, TemplatesPanel, UploadsPanel, BrandPanel
} from '../components/editor/ToolPanels';
import '../components/editor/ToolPanels.css';
import './Editor.css';

const adSizes = [
    { name: 'Instagram Post', w: 1080, h: 1080 },
    { name: 'Instagram Story', w: 1080, h: 1920 },
    { name: 'Facebook Ad', w: 1200, h: 628 },
    { name: 'Google Banner', w: 300, h: 250 },
    { name: 'YouTube Thumbnail', w: 1280, h: 720 },
    { name: 'LinkedIn Banner', w: 1200, h: 627 },
    { name: 'Custom', w: 800, h: 600 },
];

const toolDefs = [
    { id: 'text', icon: <Type size={20} />, label: 'Text' },
    { id: 'image', icon: <Image size={20} />, label: 'Images' },
    { id: 'shapes', icon: <Square size={20} />, label: 'Shapes' },
    { id: 'icons', icon: <Circle size={20} />, label: 'Icons' },
    { id: 'video', icon: <Video size={20} />, label: 'Videos' },
    { id: 'bg', icon: <Palette size={20} />, label: 'Backgrounds' },
    { id: 'templates', icon: <Layout size={20} />, label: 'Templates' },
    { id: 'uploads', icon: <Upload size={20} />, label: 'Uploads' },
    { id: 'brand', icon: <Brush size={20} />, label: 'Brand Assets' },
    { id: 'ai', icon: <Wand2 size={20} />, label: 'AI Assistant' },
];

const defaultElements = [
    { id: 1, type: 'text', content: 'Summer Sale', x: 120, y: 80, w: 280, h: 60, fontSize: 36, fontWeight: 800, color: '#FFFFFF', locked: false, visible: true },
    { id: 2, type: 'text', content: '50% OFF', x: 160, y: 160, w: 200, h: 80, fontSize: 52, fontWeight: 900, color: '#FFD93D', locked: false, visible: true },
    { id: 3, type: 'shape', content: '', x: 140, y: 280, w: 240, h: 48, color: '#FFFFFF', borderRadius: 24, locked: false, visible: true },
    { id: 4, type: 'text', content: 'Shop Now →', x: 180, y: 290, w: 160, h: 30, fontSize: 16, fontWeight: 600, color: '#6366F1', locked: false, visible: true },
];

export default function Editor() {
    const [activeTool, setActiveTool] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [elements, setElements] = useState(defaultElements);
    const [history, setHistory] = useState([defaultElements]);
    const [historyIdx, setHistoryIdx] = useState(0);
    const [canvasSize, setCanvasSize] = useState(adSizes[0]);
    const [canvasBg, setCanvasBg] = useState('linear-gradient(135deg, #6366F1, #8B5CF6, #A78BFA)');
    const [showSizeDropdown, setShowSizeDropdown] = useState(false);
    const [zoom, setZoom] = useState(0.5);
    const [showExport, setShowExport] = useState(false);
    const [showLayers, setShowLayers] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showAI, setShowAI] = useState(false);
    const [aiMessages, setAiMessages] = useState([
        { role: 'ai', text: "Hi! I'm your AI design assistant. I can help you generate headlines, CTAs, suggest colors, and more." }
    ]);
    const [aiInput, setAiInput] = useState('');
    const [savedMsg, setSavedMsg] = useState('');
    const canvasRef = useRef(null);

    const selectedEl = elements.find(e => e.id === selectedElement);

    // ---- History (Undo/Redo) ----
    const pushHistory = (newEls) => {
        const newHist = history.slice(0, historyIdx + 1);
        newHist.push(newEls);
        setHistory(newHist);
        setHistoryIdx(newHist.length - 1);
        setElements(newEls);
    };
    const undo = () => {
        if (historyIdx > 0) { setHistoryIdx(historyIdx - 1); setElements(history[historyIdx - 1]); }
    };
    const redo = () => {
        if (historyIdx < history.length - 1) { setHistoryIdx(historyIdx + 1); setElements(history[historyIdx + 1]); }
    };

    // ---- Element operations ----
    const addElement = (partial) => {
        const newEl = {
            id: Date.now() + Math.random(),
            x: 80 + Math.random() * 120,
            y: 80 + Math.random() * 120,
            locked: false,
            visible: true,
            ...partial,
        };
        const newEls = [...elements, newEl];
        pushHistory(newEls);
        setSelectedElement(newEl.id);
    };

    const updateElement = (id, updates) => {
        const newEls = elements.map(el => el.id === id ? { ...el, ...updates } : el);
        setElements(newEls);
    };
    const commitUpdate = () => { pushHistory([...elements]); };

    const deleteElement = (id) => {
        const newEls = elements.filter(el => el.id !== id);
        pushHistory(newEls);
        if (selectedElement === id) setSelectedElement(null);
    };

    const duplicateElement = (id) => {
        const el = elements.find(e => e.id === id);
        if (!el) return;
        const newEl = { ...el, id: Date.now() + Math.random(), x: el.x + 20, y: el.y + 20 };
        const newEls = [...elements, newEl];
        pushHistory(newEls);
        setSelectedElement(newEl.id);
    };

    // ---- Drag ----
    const handleElementMouseDown = (e, elId) => {
        e.stopPropagation();
        const el = elements.find(x => x.id === elId);
        if (el.locked) return;
        setSelectedElement(elId);
        const startX = e.clientX, startY = e.clientY;
        const origX = el.x, origY = el.y;
        const onMove = (ev) => {
            const dx = (ev.clientX - startX) / zoom;
            const dy = (ev.clientY - startY) / zoom;
            setElements(prev => prev.map(item =>
                item.id === elId ? { ...item, x: Math.round(origX + dx), y: Math.round(origY + dy) } : item
            ));
        };
        const onUp = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            pushHistory(elements.map(item => item.id === elId ? { ...item } : item));
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    };

    const handleCanvasClick = (e) => {
        if (e.target === e.currentTarget || e.target === canvasRef.current) setSelectedElement(null);
    };

    // ---- Templates ----
    const applyTemplate = (tpl) => {
        const newEls = tpl.elements.map((el, i) => ({
            ...el, id: Date.now() + i, locked: false, visible: true,
            borderRadius: el.borderRadius || 0,
        }));
        setCanvasBg(tpl.bg);
        pushHistory(newEls);
        setSelectedElement(null);
    };

    // ---- Background ----
    const changeBg = (bg) => setCanvasBg(bg);

    // ---- AI ----
    const sendAIMessage = () => {
        if (!aiInput.trim()) return;
        setAiMessages(prev => [...prev, { role: 'user', text: aiInput }]);
        const q = aiInput; setAiInput('');
        setTimeout(() => {
            let response;
            const ql = q.toLowerCase();
            if (ql.includes('headline') || ql.includes('heading')) {
                response = 'Here are some headline ideas:\n• "Unlock Exclusive Deals — Limited Time Only!"\n• "Transform Your Look This Season"\n• "Don\'t Miss Out — Sale Ends Tonight!"';
            } else if (ql.includes('cta') || ql.includes('button')) {
                response = 'Strong CTA options:\n• "Get Started Free"\n• "Shop Now →"\n• "Claim Your Discount"\n• "Try It Today"';
            } else if (ql.includes('color')) {
                response = 'Color suggestions for better engagement:\n• Use #FF6B6B (warm red) for urgency\n• Use #10B981 (green) for trust\n• Try contrasting your CTA button with #F59E0B';
            } else if (ql.includes('improve') || ql.includes('copy')) {
                response = 'Tips to improve your copy:\n• Keep headlines under 8 words\n• Use action verbs (Get, Try, Discover)\n• Add urgency with time-limited language';
            } else {
                response = 'Great question! Here are some tips:\n• Keep your design clean and focused\n• Use max 2-3 fonts\n• Ensure text is readable over backgrounds\n• Add white space for visual breathing room';
            }
            setAiMessages(prev => [...prev, { role: 'ai', text: response }]);
        }, 800);
    };

    // ---- Save ----
    const handleSave = () => {
        setSavedMsg('Saved!');
        setTimeout(() => setSavedMsg(''), 2000);
    };

    // ---- Render element on canvas ----
    const renderElement = (el) => {
        const s = zoom;
        if (el.type === 'text') {
            return (
                <span style={{
                    fontSize: (el.fontSize || 16) * s, fontWeight: el.fontWeight || 400,
                    color: el.color || '#fff', fontFamily: el.fontFamily || 'var(--font-display)',
                    lineHeight: 1.2, whiteSpace: 'nowrap', userSelect: 'none',
                    fontStyle: el.italic ? 'italic' : 'normal',
                    textDecoration: el.underline ? 'underline' : 'none',
                    textAlign: el.textAlign || 'left', display: 'block', width: '100%',
                }}>{el.content}</span>
            );
        }
        if (el.type === 'shape') {
            if (el.isTriangle) {
                return <div style={{ width: 0, height: 0, borderLeft: `${el.w * s / 2}px solid transparent`, borderRight: `${el.w * s / 2}px solid transparent`, borderBottom: `${el.h * s}px solid ${el.color}` }} />;
            }
            if (el.isPolygon === 'star') {
                return <span style={{ fontSize: el.w * s * 0.8, color: el.color, lineHeight: 1 }}>★</span>;
            }
            if (el.isPolygon === 'heart') {
                return <span style={{ fontSize: el.w * s * 0.7, color: el.color, lineHeight: 1 }}>♥</span>;
            }
            if (el.isPolygon) {
                return <div style={{ width: '100%', height: '100%', background: el.color, borderRadius: el.borderRadius * s, clipPath: el.isPolygon === 'hexagon' ? 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' : el.isPolygon === 'pentagon' ? 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' : 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />;
            }
            if (el.isLine) {
                return <div style={{ width: '100%', height: '100%', background: el.color, position: 'relative' }}>
                    {el.lineDir === 'arrow' && <span style={{ position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)', color: el.color, fontSize: 16 }}>▶</span>}
                </div>;
            }
            return <div style={{ width: '100%', height: '100%', background: el.color, borderRadius: (el.borderRadius || 0) * s, transform: el.rotate ? `rotate(${el.rotate}deg)` : 'none' }} />;
        }
        if (el.type === 'image') {
            return <img src={el.content} alt={el.label || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 * s, pointerEvents: 'none' }} draggable={false} />;
        }
        if (el.type === 'icon') {
            return <span style={{ fontSize: (el.fontSize || 40) * s, color: el.color, lineHeight: 1, userSelect: 'none' }}>{el.content}</span>;
        }
        if (el.type === 'video') {
            return (
                <div style={{ width: '100%', height: '100%', background: el.color, borderRadius: 8 * s, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 * s }}>
                    <Play size={24 * s} fill="white" color="white" />
                    <span style={{ fontSize: 10 * s, color: 'white', fontWeight: 600 }}>{el.content}</span>
                </div>
            );
        }
        return null;
    };

    const canvasScale = zoom;
    const displayW = canvasSize.w * canvasScale;
    const displayH = canvasSize.h * canvasScale;

    // ---- Render tool panel ----
    const renderToolPanel = () => {
        switch (activeTool) {
            case 'text': return <TextPanel onAddElement={addElement} />;
            case 'image': return <ImagesPanel onAddElement={addElement} />;
            case 'shapes': return <ShapesPanel onAddElement={addElement} />;
            case 'icons': return <IconsPanel onAddElement={addElement} />;
            case 'video': return <VideosPanel onAddElement={addElement} />;
            case 'bg': return <BackgroundsPanel canvasBg={canvasBg} onChangeBg={changeBg} />;
            case 'templates': return <TemplatesPanel onApplyTemplate={applyTemplate} />;
            case 'uploads': return <UploadsPanel onAddElement={addElement} />;
            case 'brand': return <BrandPanel onAddElement={addElement} onChangeBg={changeBg} />;
            default: return null;
        }
    };

    return (
        <div className="editor">
            {/* Top Bar */}
            <header className="editor-topbar">
                <div className="editor-topbar-left">
                    <Link to="/dashboard" className="btn btn-icon editor-back"><ArrowLeft size={18} /></Link>
                    <div className="editor-file-name">
                        <input type="text" defaultValue="Summer Sale Campaign" className="editor-file-input" />
                    </div>
                    <div className="editor-topbar-actions">
                        <button className="btn btn-icon" title="Undo" onClick={undo} disabled={historyIdx <= 0} style={{ opacity: historyIdx <= 0 ? 0.3 : 1 }}><Undo2 size={16} /></button>
                        <button className="btn btn-icon" title="Redo" onClick={redo} disabled={historyIdx >= history.length - 1} style={{ opacity: historyIdx >= history.length - 1 ? 0.3 : 1 }}><Redo2 size={16} /></button>
                    </div>
                </div>
                <div className="editor-topbar-center">
                    <div className="editor-size-selector" onClick={() => setShowSizeDropdown(!showSizeDropdown)}>
                        <span>{canvasSize.name} ({canvasSize.w}×{canvasSize.h})</span>
                        <ChevronDown size={14} />
                        {showSizeDropdown && (
                            <div className="editor-size-dropdown">
                                {adSizes.map(s => (
                                    <button key={s.name} className={`editor-size-option ${s.name === canvasSize.name ? 'active' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); setCanvasSize(s); setShowSizeDropdown(false); }}>
                                        <span>{s.name}</span>
                                        <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>{s.w}×{s.h}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="editor-zoom">
                        <button className="btn btn-icon" onClick={() => setZoom(z => Math.max(0.2, +(z - 0.1).toFixed(1)))}><ZoomOut size={14} /></button>
                        <span className="editor-zoom-value">{Math.round(zoom * 100)}%</span>
                        <button className="btn btn-icon" onClick={() => setZoom(z => Math.min(2, +(z + 0.1).toFixed(1)))}><ZoomIn size={14} /></button>
                    </div>
                </div>
                <div className="editor-topbar-right">
                    <button className="btn btn-ghost btn-sm" onClick={() => setShowLayers(!showLayers)}>
                        <Layers size={16} /> Layers
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setShowPreview(true)}><Eye size={16} /> Preview</button>
                    <button className="btn btn-ghost btn-sm" onClick={handleSave}><Save size={16} /> {savedMsg || 'Save'}</button>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowExport(true)}>
                        <Download size={16} /> Export
                    </button>
                </div>
            </header>

            <div className="editor-body">
                {/* Tools Sidebar */}
                <aside className="editor-tools">
                    {toolDefs.map(t => (
                        <button key={t.id}
                            className={`editor-tool-btn ${activeTool === t.id ? 'active' : ''} ${t.id === 'ai' && showAI ? 'active' : ''}`}
                            onClick={() => {
                                if (t.id === 'ai') { setShowAI(!showAI); setActiveTool(null); }
                                else { setShowAI(false); setActiveTool(activeTool === t.id ? null : t.id); }
                            }}
                            title={t.label}
                        >
                            {t.icon}
                            <span className="editor-tool-label">{t.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Tool Panel */}
                {activeTool && renderToolPanel()}

                {/* Canvas Area */}
                <div className="editor-canvas-area" onClick={handleCanvasClick}>
                    <div className="editor-canvas" ref={canvasRef}
                        style={{ width: displayW, height: displayH, background: canvasBg }}
                        onClick={handleCanvasClick}>
                        {elements.filter(el => el.visible).map(el => (
                            <div key={el.id}
                                className={`editor-element ${selectedElement === el.id ? 'selected' : ''} ${el.locked ? 'locked' : ''}`}
                                style={{ left: el.x * canvasScale, top: el.y * canvasScale, width: el.w * canvasScale, height: el.h * canvasScale, cursor: el.locked ? 'default' : 'move' }}
                                onMouseDown={(e) => handleElementMouseDown(e, el.id)}
                                onClick={(e) => { e.stopPropagation(); setSelectedElement(el.id); }}>
                                {renderElement(el)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Properties Panel */}
                <aside className="editor-props">
                    {selectedEl ? (
                        <div className="editor-props-content">
                            <div className="editor-props-header">
                                <h3>Properties</h3>
                                <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                                    <button className="btn btn-icon btn-sm" onClick={() => duplicateElement(selectedEl.id)} title="Duplicate"><Copy size={14} /></button>
                                    <button className="btn btn-icon btn-sm" onClick={() => updateElement(selectedEl.id, { locked: !selectedEl.locked })} title="Lock">
                                        {selectedEl.locked ? <Lock size={14} /> : <Unlock size={14} />}
                                    </button>
                                    <button className="btn btn-icon btn-sm" onClick={() => deleteElement(selectedEl.id)} title="Delete" style={{ color: 'var(--error)' }}><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <div className="editor-props-section">
                                <h4>Position & Size</h4>
                                <div className="editor-props-grid">
                                    {[['X', 'x'], ['Y', 'y'], ['W', 'w'], ['H', 'h']].map(([l, k]) => (
                                        <div key={k} className="input-group">
                                            <label className="input-label">{l}</label>
                                            <input type="number" className="input" value={Math.round(selectedEl[k])} onChange={e => updateElement(selectedEl.id, { [k]: +e.target.value })} onBlur={commitUpdate} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {selectedEl.type === 'text' && (
                                <div className="editor-props-section">
                                    <h4>Typography</h4>
                                    <div className="input-group" style={{ marginBottom: 8 }}>
                                        <label className="input-label">Text</label>
                                        <input type="text" className="input" value={selectedEl.content} onChange={e => updateElement(selectedEl.id, { content: e.target.value })} onBlur={commitUpdate} />
                                    </div>
                                    <div className="editor-props-grid">
                                        <div className="input-group">
                                            <label className="input-label">Size</label>
                                            <input type="number" className="input" value={selectedEl.fontSize || 16} onChange={e => updateElement(selectedEl.id, { fontSize: +e.target.value })} onBlur={commitUpdate} />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Weight</label>
                                            <select className="input" value={selectedEl.fontWeight || 400} onChange={e => { updateElement(selectedEl.id, { fontWeight: +e.target.value }); commitUpdate(); }}>
                                                {[300, 400, 600, 700, 800, 900].map(w => <option key={w} value={w}>{w}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="editor-text-align" style={{ marginTop: 8 }}>
                                        {[['left', AlignLeft], ['center', AlignCenter], ['right', AlignRight]].map(([a, Icon]) => (
                                            <button key={a} className={`btn btn-icon btn-sm ${selectedEl.textAlign === a ? 'active' : ''}`}
                                                onClick={() => { updateElement(selectedEl.id, { textAlign: a }); commitUpdate(); }}
                                                style={selectedEl.textAlign === a ? { background: 'var(--accent-primary-light)', color: 'var(--accent-primary)' } : {}}>
                                                <Icon size={14} />
                                            </button>
                                        ))}
                                        <span className="editor-props-divider" />
                                        <button className={`btn btn-icon btn-sm`} onClick={() => { updateElement(selectedEl.id, { fontWeight: selectedEl.fontWeight >= 700 ? 400 : 700 }); commitUpdate(); }}
                                            style={selectedEl.fontWeight >= 700 ? { background: 'var(--accent-primary-light)', color: 'var(--accent-primary)' } : {}}><Bold size={14} /></button>
                                        <button className={`btn btn-icon btn-sm`} onClick={() => { updateElement(selectedEl.id, { italic: !selectedEl.italic }); commitUpdate(); }}
                                            style={selectedEl.italic ? { background: 'var(--accent-primary-light)', color: 'var(--accent-primary)' } : {}}><Italic size={14} /></button>
                                        <button className={`btn btn-icon btn-sm`} onClick={() => { updateElement(selectedEl.id, { underline: !selectedEl.underline }); commitUpdate(); }}
                                            style={selectedEl.underline ? { background: 'var(--accent-primary-light)', color: 'var(--accent-primary)' } : {}}><Underline size={14} /></button>
                                    </div>
                                </div>
                            )}
                            <div className="editor-props-section">
                                <h4>Color</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <input type="color" value={selectedEl.color || '#ffffff'} onChange={e => updateElement(selectedEl.id, { color: e.target.value })} onBlur={commitUpdate} style={{ width: 36, height: 36, border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }} />
                                    <input type="text" className="input" value={selectedEl.color || '#ffffff'} onChange={e => updateElement(selectedEl.id, { color: e.target.value })} onBlur={commitUpdate} style={{ flex: 1 }} />
                                </div>
                            </div>
                            {selectedEl.type === 'shape' && !selectedEl.isTriangle && !selectedEl.isPolygon && !selectedEl.isLine && (
                                <div className="editor-props-section">
                                    <h4>Border Radius</h4>
                                    <input type="range" min="0" max="200" value={selectedEl.borderRadius || 0} onChange={e => updateElement(selectedEl.id, { borderRadius: +e.target.value })} onMouseUp={commitUpdate} style={{ width: '100%' }} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="editor-props-empty">
                            <Move size={32} style={{ opacity: 0.3 }} />
                            <p>Select an element to edit its properties</p>
                        </div>
                    )}
                </aside>
            </div>

            {/* Layers Panel */}
            {showLayers && (
                <div className="editor-layers-panel">
                    <div className="editor-layers-header">
                        <h3>Layers ({elements.length})</h3>
                        <button className="btn btn-icon btn-sm" onClick={() => setShowLayers(false)}><X size={14} /></button>
                    </div>
                    <div className="editor-layers-list">
                        {[...elements].reverse().map(el => (
                            <div key={el.id} className={`editor-layer-item ${selectedElement === el.id ? 'active' : ''}`}
                                onClick={() => setSelectedElement(el.id)}>
                                <button className="btn btn-icon btn-sm" onClick={(e) => { e.stopPropagation(); updateElement(el.id, { visible: !el.visible }); commitUpdate(); }}>
                                    {el.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                                </button>
                                <span className="editor-layer-name">
                                    {el.type === 'text' ? el.content : el.type === 'image' ? (el.label || 'Image') : el.type === 'icon' ? el.content : el.type === 'video' ? el.content : 'Shape'}
                                </span>
                                <button className="btn btn-icon btn-sm" onClick={(e) => { e.stopPropagation(); updateElement(el.id, { locked: !el.locked }); commitUpdate(); }}>
                                    {el.locked ? <Lock size={12} /> : <Unlock size={12} />}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* AI Assistant Panel */}
            {showAI && (
                <div className="editor-ai-panel">
                    <div className="editor-ai-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><Wand2 size={18} /><h3>AI Assistant</h3></div>
                        <button className="btn btn-icon btn-sm" onClick={() => setShowAI(false)}><X size={14} /></button>
                    </div>
                    <div className="editor-ai-messages">
                        {aiMessages.map((msg, i) => (
                            <div key={i} className={`editor-ai-msg ${msg.role}`}>
                                {msg.role === 'ai' && <div className="editor-ai-avatar"><Wand2 size={14} /></div>}
                                <div className="editor-ai-bubble" style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                            </div>
                        ))}
                    </div>
                    <div className="editor-ai-suggestions">
                        {['Generate headline', 'Write CTA', 'Suggest colors', 'Improve copy'].map(s => (
                            <button key={s} className="editor-ai-suggestion" onClick={() => { setAiInput(s); }}>{s}</button>
                        ))}
                    </div>
                    <div className="editor-ai-input">
                        <input type="text" placeholder="Ask AI anything..." value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendAIMessage()} />
                        <button className="btn btn-primary btn-icon" onClick={sendAIMessage}><Send size={16} /></button>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {showPreview && (
                <div className="modal-overlay" onClick={() => setShowPreview(false)}>
                    <div style={{ background: 'transparent', maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                            <button className="btn btn-icon" onClick={() => setShowPreview(false)} style={{ color: 'white' }}><X size={24} /></button>
                        </div>
                        <div style={{ width: Math.min(canvasSize.w * 0.6, 800), height: Math.min(canvasSize.h * 0.6, 600), background: canvasBg, borderRadius: 8, position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                            {elements.filter(el => el.visible).map(el => {
                                const previewScale = Math.min(800 / canvasSize.w, 600 / canvasSize.h) * 0.6;
                                return (
                                    <div key={el.id} style={{ position: 'absolute', left: el.x * previewScale, top: el.y * previewScale, width: el.w * previewScale, height: el.h * previewScale, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {el.type === 'text' && <span style={{ fontSize: (el.fontSize || 16) * previewScale, fontWeight: el.fontWeight, color: el.color, fontFamily: el.fontFamily || 'var(--font-display)', whiteSpace: 'nowrap' }}>{el.content}</span>}
                                        {el.type === 'shape' && <div style={{ width: '100%', height: '100%', background: el.color, borderRadius: (el.borderRadius || 0) * previewScale }} />}
                                        {el.type === 'image' && <img src={el.content} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />}
                                        {el.type === 'icon' && <span style={{ fontSize: (el.fontSize || 40) * previewScale, color: el.color }}>{el.content}</span>}
                                        {el.type === 'video' && <div style={{ width: '100%', height: '100%', background: el.color, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Play size={20} fill="white" color="white" /></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Export Modal */}
            {showExport && (
                <div className="modal-overlay" onClick={() => setShowExport(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 style={{ fontSize: 'var(--text-xl)' }}>Export Design</h2>
                            <button className="btn btn-icon" onClick={() => setShowExport(false)}><X size={18} /></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                {['PNG', 'JPG', 'GIF', 'MP4', 'PDF'].map(fmt => (
                                    <button key={fmt} className="btn btn-secondary" style={{ justifyContent: 'space-between' }}>
                                        <span>{fmt}</span><Download size={16} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
