import { createContext, memo, useContext, useState } from "react";
// Paso 1: Crear el contexto con los valores iniciales
const UserContext = createContext({
  userId: "",
  token: "",
  setUserId: () => {},
  setToken: () => {},
  tickets: [],
  setTickets: () => {},
});
// Paso 2: Crear el provider
export const UserContextProvider = memo(({ children }) => {
  // Paso 3: Crear los estados y funciones que modificarán el contexto
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [tickets, setTickets] = useState("");

  // Paso 4: Crear el objeto que va a ser la prop de contexto
  const contextValue = memo(
    () => ({
      userId,
      token,
      setUserId,
      setToken,
      tickets,
      setTickets,
    }),
    // Paso 5: Agregar las dependencias del objeto
    [userId, token, tickets]
  );

  return (
    // Paso 6: Retornar el provider con el valor del contexto y sus hijos
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
});

// Paso 7: Crear un hook para consumir el contexto
export const useUserContext = () => useContext(UserContext);