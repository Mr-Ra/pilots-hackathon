import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const AlertContext = createContext();

// Proveedor del contexto
export const AlertProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <AlertContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </AlertContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAlertContext = () => useContext(AlertContext);
