import { createContext, useContext, useState, useCallback } from "react";

// Paso 1: Crear el contexto
const UserContext = createContext({
  userId: "",
  token: "",
  role: "",
  setUserId: () => {},
  setToken: () => {},
  setRole: () => {},
  logout: () => {},
});

// Paso 2: Crear el provider
export const UserContextProvider = ({ children }) => {
  // Estados para userId, token y role
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  // Función para cerrar sesión y limpiar el contexto
  const logout = useCallback(() => {
    setUserId("");
    setToken("");
    setRole("");
    localStorage.removeItem("authToken");
  }, []);

  // Configuración del valor del contexto
  const contextValue = {
    userId,
    token,
    role,
    setUserId,
    setToken,
    setRole,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para consumir el contexto
export const useUserContext = () => useContext(UserContext);
