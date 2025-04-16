import AppRoutes from './AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './App.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactQueryDevtools />
        <AppRoutes />

        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 9000,
            },
            error: {
              duration: 9000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 20px',
              backgroundColor: '#dde6ed',
              color: '#000',
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
