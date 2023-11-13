import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Auth from "./Auth";
import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";
import Test from "./components/tasks/Test";

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log("token: ", token)
    return !!token;
};

function App() {
    const authenticated = isAuthenticated();
    console.log("Is authenticated:", authenticated);

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/tasks" element={authenticated ? <Layout> <Test /> </Layout>  : <Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App