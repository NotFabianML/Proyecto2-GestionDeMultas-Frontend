import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const UserContext = createContext({
  userId: null,
  token: null,
  role: null,
  setUserId: () => {},
  setToken: () => {},
  setRole: () => {},
  logout: () => {},
});

// Provider
export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const logout = () => {
    setUserId(null);
    setToken(null);
    setRole(null);
    sessionStorage.clear();
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    const storedUserId = sessionStorage.getItem("userId");
    const storedRole = sessionStorage.getItem("role");

    if (storedToken && storedUserId && storedRole) {
      setToken(storedToken);
      setUserId(storedUserId);
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    if (token) sessionStorage.setItem("authToken", token);
    if (userId) sessionStorage.setItem("userId", userId);
    if (role) sessionStorage.setItem("role", role);
  }, [token, userId, role]);

  const contextValue = {
    userId,
    token,
    role,
    setUserId,
    setToken,
    setRole,
    logout,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Hook para usar el contexto
export const useUserContext = () => useContext(UserContext);
