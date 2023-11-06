import "./App.scss";
import Layout from "./components/Layout/Layout.jsx";
import { Route, Routes } from "react-router-dom";
import Redirect from "./pages/Redirect/Redirect";
import Home from "./pages/Home/Home";
import AuthForm from './components/AuthForm/AuthForm.jsx'
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
function App() {
  return (
    <Layout>
      <Routes>
        {!localStorage.getItem("token") ? (
          <Route index element={<Home />} />
        ) : (
          <>
            <Route path="*" element={<Redirect />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </Layout>
  );
}

export default App;
