import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from './contexts/authContext';
import Explore from './modules/explore';
import Home from "./modules/home";
import LoginPage from "./modules/login";
import MainLayout from './modules/main/mainLayout';
import Register from "./modules/register";
import Settings from "./modules/settings";
import User from "./modules/user";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='explore' element={<Explore/>}/>
            <Route path='/:username' element={<User/>}/>
            <Route path='settings' element={<Settings/>}/>
          </Route>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
