import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("nk_admin");
    const storedToken = localStorage.getItem("nk_admin_token");
    if (storedAdmin && storedToken) {
      setAdmin(JSON.parse(storedAdmin));
      setAdminToken(storedToken);
    }
    
  }, []);

  const adminLogin = useCallback((data) => {
    const { user, token } = data;
    setAdmin(user);
    setAdminToken(token);
    localStorage.setItem("nk_admin", JSON.stringify(user));
    localStorage.setItem("nk_admin_token", token);
  }, []);

  const adminLogout = useCallback(() => {
    setAdmin(null);
    setAdminToken(null);
    localStorage.removeItem("nk_admin");
    localStorage.removeItem("nk_admin_token");
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, adminToken, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
