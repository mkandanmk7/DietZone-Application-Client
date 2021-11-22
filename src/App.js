import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PassLinkVerify from "./Pages/PassLinkVerify";
import { RegisterUser } from "./Pages/RegisterUser";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/passverifylink/:userId/:token"
            element={<PassLinkVerify />}
          />
        </Routes>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
