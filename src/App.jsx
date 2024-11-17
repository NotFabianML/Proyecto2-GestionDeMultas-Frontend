import "./styles/App.css";
import { UserContextProvider } from "./contexts/UserContext";
import { MainRouter } from "./routes";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <MainRouter />
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
