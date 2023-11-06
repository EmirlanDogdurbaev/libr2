import "./App.scss";
import Layout from "./components/Layout/Layout.jsx";
import { Route, Routes } from "react-router-dom";
import Redirect from "./pages/Redirect/Redirect";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Layout>
      {localStorage.getItem("token") ? (
        <Routes>
          <Route index path={"/home"} element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Routes path="*" element={<Redirect />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </Layout>
  );
}

export default App;
