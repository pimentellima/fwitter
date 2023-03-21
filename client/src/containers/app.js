import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from '../contexts/authContext';
import Bookmarks from '../containers/bookmarks'
import Login from './auth/login';
import Signup from "./auth/signup";
import ExplorePage from './explorePage';
import HomePage from "./homePage";
import Layout from './layout';
import ViewPost from "./post/viewPost";
import ProfilePage from "./profile/profilePage";
import Settings from './settings';

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
            <Route path='bookmarks' element={<Bookmarks/>}/>
            <Route path='settings' element={<Settings/>}/>
            <Route path='/post/:post_id' element={<ViewPost/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;