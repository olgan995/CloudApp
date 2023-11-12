import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";
import Test from "./components/tasks/Test";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Layout> <Auth /> </Layout>} />
            <Route path="/" element={<Layout> <Login /> </Layout>} />
            <Route path="/login" element={<Layout> <Login /> </Layout>} />
            <Route path="/register" element={<Layout> <Register /> </Layout>} />
            <Route path="/logout" element={<Layout> <Logout /> </Layout>} />
            <Route path="/tasks" element={<Layout> <Test /> </Layout>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App