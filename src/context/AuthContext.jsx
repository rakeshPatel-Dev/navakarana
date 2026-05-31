import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("nk_user");
    const storedToken = localStorage.getItem("nk_token");
    const storedRefresh = localStorage.getItem("nk_refresh_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setRefreshToken(storedRefresh);
    }
    setInitialized(true);
  }, []);

  const login = useCallback((data) => {
    const { user, token, refresh_token } = data;
    setUser(user);
    setToken(token);
    setRefreshToken(refresh_token);
    localStorage.setItem("nk_user", JSON.stringify(user));
    localStorage.setItem("nk_token", token);
    localStorage.setItem("nk_refresh_token", refresh_token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("nk_user");
    localStorage.removeItem("nk_token");
    localStorage.removeItem("nk_refresh_token");
  }, []);

  const isTeacherUnlocked = useCallback(() => {
    return user?.teacher_profile?.dashboard_unlocked === true;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, initialized, login, logout, isTeacherUnlocked }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
