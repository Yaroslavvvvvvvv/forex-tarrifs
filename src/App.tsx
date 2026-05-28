import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppMainLoader from '@/components/ui/AppMainLoader';
import { router } from '@/router';

function App() {
  return (
    <>
      <AppMainLoader />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
