import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from '../contexts/authContext';
import Login from './auth/login';
import Signup from "./auth/signup";
import ExplorePage from '../pages/explorePage';
import BookmarksPage from '../pages/bookmarksPage'
import HomePage from '../pages/homePage'
import Layout from './layout';
import PostPage from "../pages/postPage";
import ProfilePage from "../pages/profilePage";
import SettingsPage from '../pages/settingsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,  
    },
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='explore' element={<ExplorePage/>}/>
            <Route path='/:username' element={<ProfilePage/>}/>
            <Route path='bookmarks' element={<BookmarksPage/>}/>
            <Route path='settings' element={<SettingsPage/>}/>
            <Route path='/post/:post_id' element={<PostPage/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
