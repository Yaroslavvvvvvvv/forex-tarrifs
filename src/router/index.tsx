import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layout/main';
import Main from '@/pages/Main';
import Page404 from '@/pages/Page404';
import Page500 from '@/pages/Page500';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: 'server-error', element: <Page500 /> },
      { path: 'page-not-found', element: <Page404 /> },
      { path: '*', element: <Page404 /> },
    ],
  },
]);
