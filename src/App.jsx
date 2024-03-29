import './App.scss';
import Layout from './components/Layout/Layout.jsx';
import { Route, Routes } from 'react-router-dom';
import Redirect from './pages/Redirect/Redirect';
import Home from './pages/Home/Home';
import AuthForm from './components/AuthForm/AuthForm.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Catalog from './pages/Catalog/Catalog.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Book from './pages/Book/Book.jsx';
import Basket from './pages/Basket/Basket.jsx';
import CreateBook from './pages/CreateBook/CreateBook.jsx';
import OrderInfo from './components/OrderInfo/OrderInfo';
function App() {
  return (
    <>
      {localStorage.getItem('token') ? (
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<Redirect where={"/"} />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/book/:id" element={<Book/>} />
            <Route path="/order/:id" element={<OrderInfo/>} />
            <Route path='/new-book' element={<CreateBook/>}/>
          </Routes>
        </Layout>
      ) : (
        <>
          <Routes>
            <Route path="*" element={<Redirect where={"/login"} />} />
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
