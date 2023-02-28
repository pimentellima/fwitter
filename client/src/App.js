import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Settings from './components/settings'
import Profile from './components/profile'
import Home from './components/home'
import Explore from "./components/explore";
import AuthProvider from './contexts/authContext'
import Login from "./components/login";
import Register from "./components/register";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='explore' element={<Explore/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='settings' element={<Settings/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
