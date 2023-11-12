import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import Layout from "./components/layout/Layout";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Layout> <Auth /> </Layout>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App