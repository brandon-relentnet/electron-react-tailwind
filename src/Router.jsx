import React from 'react';
import { useRouter } from './RouterContext';

// Import your page components
import HomePage from './pages/HomePage';
import TimerPage from './pages/TimerPage';
import SettingsPage from './pages/SettingsPage';

export default function Router() {
    const { currentPage } = useRouter();

    // Map routes to components
    const routes = {
        'home': <HomePage />,
        'timer': <TimerPage />,
        'settings': <SettingsPage />
    };

    return routes[currentPage] || <div>Page not found</div>;
}