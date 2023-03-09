import { BrowserRouter, Route, Routes } from "react-router-dom";
import Explore from "./explore";
import Home from "./home";
import Profile from "../profile/profile";
import Settings from "./settings";
import Login from "../auth/login";
import Register from "../auth/register";
import AuthProvider from '../../contexts/authContext';
import PostsProvider from "../../contexts/postsContext";
import Layout from './layout'

const App = () => {
  return (
    <AuthProvider>
      <PostsProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='explore' element={<Explore/>}/>
              <Route path='/:username' element={<Profile/>}/>
              <Route path='settings' element={<Settings/>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App;