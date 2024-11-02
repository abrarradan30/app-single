import './bootstrap';
import { createInertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
// import { render } from 'react-dom'
import { createRoot } from 'react-dom/client';

createInertiaApp({
    resolve: name => import(`./Pages/${name}`),
    setup({ el, App, props }) {
        const root = createRoot(el); // Buat root menggunakan createRoot
        root.render(<App {...props} />);
    }
})
