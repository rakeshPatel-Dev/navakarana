import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '@/store/store';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <AdminAuthProvider>
        <Provider store={store}>
          <TooltipProvider>
            <BrowserRouter>
              <Toaster position="top-right" duration={3000} closeButton />
              <App />
            </BrowserRouter>
          </TooltipProvider>
        </Provider>
      </AdminAuthProvider>
    </AuthProvider>
  </ThemeProvider>
);