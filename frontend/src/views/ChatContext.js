import React, { createContext, useState, useEffect } from "react";


const ChatContext = createContext();


const ChatProvider = ({ children }) => {

  const [showChat, setShowChat] = useState(localStorage.getItem("showChat") === "true");


  useEffect(() => {
    localStorage.setItem("showChat", showChat ? "true" : "false");
  }, [showChat]);

  return (
    <ChatContext.Provider value={{ showChat, setShowChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };
