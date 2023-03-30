import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from './mainLayout';
import AuthProvider from '../../contexts/authContext';
import PostPage from "../post/postPage";
import LoginPage from '../auth/loginPage'
import SignupPage from "../auth/signupPage";
import HomePage from "../home/homePage";
import ProfilePage from "../profile/profilePage";
import ExplorePage from '../explore/explorePage'
import BookmarksPage from '../bookmarks/bookmarksPage'
import SettingsPage from '../settings/settingsPage'

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
          <Route path='/' element={<MainLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='explore' element={<ExplorePage/>}/>
            <Route path='/:username' element={<ProfilePage/>}/>
            <Route path='bookmarks' element={<BookmarksPage/>}/>
            <Route path='settings' element={<SettingsPage/>}/>
            <Route path='/post/:post_id' element={<PostPage/>}/>
          </Route>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<SignupPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
