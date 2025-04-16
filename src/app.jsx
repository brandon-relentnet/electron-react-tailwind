import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from './RouterContext';
import Router from './Router';
import Navigation from './components/Navigation.jsx';

function App() {
    return (
        <RouterProvider>
            <div className="flex flex-col h-screen">
                <Navigation />
                <main className="flex-grow">
                    <Router />
                </main>
            </div>
        </RouterProvider>
    );
}

const root = createRoot(document.body);
root.render(<App />);