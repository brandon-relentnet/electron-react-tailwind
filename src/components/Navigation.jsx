import React from 'react';
import { useRouter } from '../RouterContext';
import navItems from '../data/navItems.js';

export default function Navigation() {
    const { setCurrentPage } = useRouter();

    return (
        <nav className="flex space-x-4 p-4 bg-gray-800 text-white">
            {navItems.map((item) => (
                <button
                    key={item.name}
                    className="px-3 py-1 rounded hover:bg-gray-700"
                    onClick={() => setCurrentPage(item.name)}
                >
                    {item.title}
                </button>
            ))}
        </nav>
    );
}