import React from 'react';
import HomePage from '../pages/HomePage';
import Stopwatch from '../pages/Stopwatch';
import SettingsPage from '../pages/SettingsPage';
import Timers from '../pages/Timers';

const navItems = [
    {
        name: 'home',
        page: <HomePage />,
        title: 'Home',
    },
    {
        name: 'stopwatch',
        page: <Stopwatch />,
        title: 'Stopwatch',
    },
    {
        name: 'settings',
        page: <SettingsPage />,
        title: 'Settings',
    },
    {
        name: 'timers',
        page: <Timers />,
        title: 'Timers',
    },
];

export default navItems;