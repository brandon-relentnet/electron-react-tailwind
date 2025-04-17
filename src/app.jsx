import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from './RouterContext';
import Router from './Router';
import Navigation from './components/Navigation.jsx';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { GridLayoutProvider } from './components/GridLayoutContext';

function App() {
    return (
        <RouterProvider>
            <GridLayoutProvider>
                <div className="flex flex-col h-screen overflow-hidden">
                    <Navigation />
                    <OverlayScrollbarsComponent defer>
                        <main className="flex-grow p-8 text-text overflow-auto">
                            <Router />
                        </main>
                    </OverlayScrollbarsComponent>
                </div>
            </GridLayoutProvider>
        </RouterProvider>
    );
}

const root = createRoot(document.body);
root.render(<App />);