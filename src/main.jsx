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

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AdminAuthProvider>

      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Toaster position="top-right" duration={3000} closeButton />
            <App />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </AdminAuthProvider>
  </ThemeProvider>
)
