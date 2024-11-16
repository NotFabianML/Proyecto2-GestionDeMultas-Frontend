import "./styles/App.css";
import { UserContextProvider } from "./contexts/UserContext";
// import { Perfil } from "./components/organism/Perfil";
import { MainRouter } from "./routes";
import React from 'react'


function App() {

  return (
    <><UserContextProvider>
      <MainRouter />
    </UserContextProvider></>
  );
}

export default App;
