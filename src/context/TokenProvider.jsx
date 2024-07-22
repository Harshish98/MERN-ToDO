import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TokenContext = React.createContext();

function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const tokenLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const SignOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate('/')
  };

  return (
    <TokenContext.Provider value={{ token, tokenLocalStorage, SignOut }}>
      {children}
    </TokenContext.Provider>
  );
}

export { TokenContext, TokenProvider };
