import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Templates from './pages/Templates';
import BrandKits from './pages/BrandKits';
import Analytics from './pages/Analytics';
import Team from './pages/Team';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import Editor from './pages/Editor';

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/brand-kits" element={<BrandKits />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/billing" element={<Billing />} />
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/editor/:projectId" element={<Editor />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
