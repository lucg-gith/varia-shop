import { createContext, useContext, useState } from "react";

const UserContext = createContext();

// NOTA: Llamar al proveedor con una funcion
const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  const login = async ({ username, password }) => {
    // User: johnd Password: m38rmF$
    // NOTA: realizamos peticiona al back para validar el username y password -  para obtener una respuesta
    console.log(username, password, "Test");
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      // NOTA: todos los fetch tienen un method, un header y un body
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // NOTA: validamos la info the user con la API
      const token = await response.json();
      setUser(true);
      return token;
    } else {
      false;
    }

    setUser(null);
  };

  // PREGUNTA: Por qué no es false?
  const logout = () => setUser(null);

  return (
    // NOTA: dentro del proveedor tengo que recibir a travez de propiedad children. tengo que englobar toda la app con este proveedor.
    <UserContext.Provider value={{ login, logout, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

const useAuth = () => useContext(UserContext);

// DESESPERACION
export { UserProvider, useAuth };
