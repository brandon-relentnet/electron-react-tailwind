import React, { createContext, useState, useContext } from 'react';

const RouterContext = createContext();

export function RouterProvider({ children }) {
    const [currentPage, setCurrentPage] = useState('home');

    return (
        <RouterContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </RouterContext.Provider>
    );
}

export function useRouter() {
    return useContext(RouterContext);
}