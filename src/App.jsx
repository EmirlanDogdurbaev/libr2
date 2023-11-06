import "./App.scss";
import Layout from "./components/Layout/Layout.jsx";
import { Route, Routes } from "react-router-dom";
import Redirect from "./pages/Redirect/Redirect";
import Home from "./pages/Home/Home";
import AuthForm from "./components/AuthForm/AuthForm.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";
function App() {
  return (
    <>
      {localStorage.getItem("token") ? (
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
          </Routes>
        </Layout>
      ) : (
        <>
          <Routes>
            <Route path="*" element={<Redirect />} />
            <Route
              path="/login"
              element={
                <AuthForm>
                  <Login />
                </AuthForm>
              }
            />
            <Route
              path="/register"
              element={
                <AuthForm>
                  <Register />
                </AuthForm>
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
