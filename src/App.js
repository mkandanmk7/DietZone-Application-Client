import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PassLinkVerify from "./Pages/PassLinkVerify";
import { RegisterUser } from "./Pages/RegisterUser";
import Login from "./Pages/Login";

const privateRoute = ({ path, component: Component }) => {
  const authtoken = localStorage.getItem("authtoken");

  return authtoken ? <Component /> : <h1>Login!!!</h1>;
};

const ConditionalRoute = ({ path, component: element }) => {
  return (
    <Route
      path={path}
      render={({ location }) => {
        return location.pathname === "/" ||
          location.pathname === "/register" ||
          location.pathname === "/userdetails" ? (
          <></>
        ) : (
          <element />
        );
      }}
    />
  );
};

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
