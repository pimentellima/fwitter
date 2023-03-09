import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from '../../contexts/authContext';
import Explore from '../explore';
import Home from "../home";
import MainLayout from "./mainLayout";
import LoginPage from "../login";
import Register from "../register";
import Settings from "../settings";
import User from "../user";

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
