import { createContext, useContext, useState } from "react";

const UserContext = createContext();

// NOTA: Llamar al proveedor con una funcion
const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  const login = async(username, password) => {
// NOTA: realizamos peticiona al back para validar el username y password -  para obtener una respuesta
const response = await fetch ( "https://fakestoreapi.com/auth/login" , {
    // NOTA: todos los fetch tienen un method, un header y un body
    method= "POST", 
    headers: {
        "content-type":"application/json"},
    body: JSON.stringify({username,password})
})

  } ;

  // PREGUNTA: ¿Por qué no es false?
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
