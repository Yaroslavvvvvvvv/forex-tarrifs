import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { QueryClientProvider } from '@tanstack/react-query';

// Inter (self-hosted variable font).
import '@fontsource-variable/inter/index.css';

// PrimeReact 10 (legacy theming): Lara theme + core + icons.
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Country flags for the datacenter switcher.
import 'flag-icons/css/flag-icons.min.css';

import './styles/global.scss';

import { queryClient } from '@/lib/queryClient';
import { applyTheme, getInitialTheme } from '@/store/appStore';
import App from './App.tsx';

// Apply the persisted theme before first paint (avoids a flash for dark users).
applyTheme(getInitialTheme());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: true }}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </PrimeReactProvider>
  </StrictMode>,
);
