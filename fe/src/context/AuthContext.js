import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext({
  name: null,
  role: null,
  token: null,
  email: null,
  login: () => {},
  logout: () => {},
  isAuth: () => false,
});

const UserProvider = ({ children }) => {
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getLocalData = () => {
        const storageToken = localStorage.getItem("token");
        const storageUser = localStorage.getItem("user");
        const storageExpiration = localStorage.getItem("expiration");

        if (storageExpiration) {
          const expirationDate = parseInt(storageExpiration);
          const currentDate = new Date().getTime();
          if (expirationDate - currentDate <= 0) {
            logout();
          } else {
            if (storageToken && storageUser) {
              const parseStorageUser = JSON.parse(storageUser);
              setName(parseStorageUser.name);
              setEmail(parseStorageUser.email);
              setRole(parseStorageUser.role);
              setToken(storageToken);
            }
          }
        }
        setLoading(false);
      };
      getLocalData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(email, role, token);
  }, [email, role, token]);

  const login = (user, token) => {
    const stringUser = JSON.stringify(user);
    const currentDate = new Date();
    localStorage.setItem("user", stringUser);
    localStorage.setItem("token", token);
    localStorage.setItem(
      "expiration",
      currentDate.setHours(currentDate.getHours() + 1).toString()
    );
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setToken(token);
  };

  const logout = () => {
    setName(null);
    setEmail(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuth = () => {
    const storageToken = localStorage.getItem("token");
    return !!storageToken;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{
        name: name,
        email: email,
        role: role,
        token: token,
        login: login,
        logout: logout,
        isAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
