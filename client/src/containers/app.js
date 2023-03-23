import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from '../components/mainLayout';
import AuthProvider from '../contexts/authContext';
import BookmarksPage from '../pages/bookmarksPage';
import ExplorePage from '../pages/explorePage';
import PostPageController from "../containers/post/postPageController";
import SettingsPage from '../pages/settingsPage';
import LoginController from '../containers/auth/loginController'
import SignupController from "../containers/auth/signupController";
import HomePageController from "./post/homePageController";
import ProfileController from "./profile/profileController";

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
            <Route index element={<HomePageController/>}/>
            <Route path='explore' element={<ExplorePage/>}/>
            <Route path='/:username' element={<ProfileController/>}/>
            <Route path='bookmarks' element={<BookmarksPage/>}/>
            <Route path='settings' element={<SettingsPage/>}/>
            <Route path='/post/:post_id' element={<PostPageController/>}/>
          </Route>
          <Route path='/login' element={<LoginController/>}/>
          <Route path='/register' element={<SignupController/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
