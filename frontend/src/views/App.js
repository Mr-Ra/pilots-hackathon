
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChatProvider } from "./ChatContext"; 
import Integracion from "./Integracion"; 

function App() {
  return (
    <ChatProvider>
      <Router>
        <Integracion />
       
      </Router>
    </ChatProvider>
  );
}

export default App;
