import React from 'react';
import { useRouter } from '../RouterContext';

export default function Navigation() {
    const { setCurrentPage } = useRouter();

    return (
        <nav className="flex space-x-4 p-4 bg-gray-800 text-white">
            <button
                className="px-3 py-1 rounded hover:bg-gray-700"
                onClick={() => setCurrentPage('home')}
            >
                Home
            </button>
            <button
                className="px-3 py-1 rounded hover:bg-gray-700"
                onClick={() => setCurrentPage('timer')}
            >
                Timer
            </button>
            <button
                className="px-3 py-1 rounded hover:bg-gray-700"
                onClick={() => setCurrentPage('settings')}
            >
                Settings
            </button>
        </nav>
    );
}