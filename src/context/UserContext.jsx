import { createContext, UseContext, useState } from "react";

const UserContext = createContext();

// NOTA: Llamar al proveedor con una funcion

const UserProvider = () => {
  const [user, setUser] = useState(null);

  const login = () => setUser(true);

  // PREGUNTA: porque no es false?

  const logout = () => setUser(null);

  return (
    // NOTA: dentro del proveedor tengo que recibir a travez de propiedad children. tengo que englobar toda la app con este proveedor.
    <UserContext.Provider value={(login, logout, user)}>
      {props.Children}
    </UserContext.Provider>
  );
};

const useAuth = UseContext(UserContext);

export { UserProvider, useAuth };
