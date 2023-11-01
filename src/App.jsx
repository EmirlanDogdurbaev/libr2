import './App.scss'
import Layout from "./components/Layout/Layout.jsx";
import {Route, Routes} from "react-router-dom";
import Redirect from './pages/Redirect/Redirect';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
    return (
        <Layout>
            {
                localStorage.getItem("token")?
                <Routes>
                <Route index path={"/home"} element={<Home/>}/>
                <Route path={"/profile"} element={<Hello2/>}/>
                <Route path={"/catalog"} element={<Hello3/>}/>
                <Route path={"/basket"} element={<Hello4/>}/>
            </Routes>
            :
            <Routes>
                <Routes path='*' element={<Redirect/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
            }
        </Layout>

    )
}

export default App;
export const Hello = () => {
    return <h1>hello 1</h1>
}
export const Hello2 = () => {
    return <h1>hello 2</h1>
}

export const Hello3 = () => {
    return <h1>hello 3</h1>
}
export const Hello4 = () => {
    return <h1>hello 4</h1>
}
