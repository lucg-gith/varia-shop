import { createContext, UserContext, useState } from "react";

const UserContext = createContext();

// NOTA: Llamar al proveedor con una funcion

const UserProvider = () => {
  const [user, setUser] = useState(null);

  const login = () => setUser(true);

  // PREGUNTA: porque no es false?

  const logout = () => setUser(null);

  return (
    // NOTA: dentro del proveedor tengo que recibir a travez de propiedad children
    <UserContext.Provider value={(login, logout, user)}>
      {props.Children}
    </UserContext.Provider>
  );
};

const useAuth = UserContext(UserContext);

export { UserProvider, useAuth };
