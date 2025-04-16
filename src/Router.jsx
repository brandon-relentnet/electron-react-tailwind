import React from 'react';
import { useRouter } from './RouterContext';
import navItems from './data/navItems.js';

export default function Router() {
    const { currentPage } = useRouter();

    const routes = navItems.reduce((acc, item) => {
        acc[item.name] = item.page;
        return acc;
    }
        , {});

    return routes[currentPage] || <div>Page not found</div>;
}