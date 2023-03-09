import { BrowserRouter, Route, Routes } from "react-router-dom";
import Explore from "./components/explore";
import Home from "./components/home";
import Profile from "./components/profile";
import Settings from "./components/settings";
import Login from "./components/login";
import Register from "./components/register";
import AuthProvider from './contexts/authContext';
import PostsProvider from "./contexts/postsContext";
import Layout from './components/layout'

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
