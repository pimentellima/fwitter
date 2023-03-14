import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from '../contexts/authContext';
import HomeFeed from "./homeFeed";
import ProfilePage from './profilePage';
import ExplorePage from './explorePage';
import Settings from './settings';
import Login from './auth/login';
import Register from './auth/register';
import Layout from './layout';
import ViewPost from "./post/viewPost";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,  
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<HomeFeed/>}/>
              <Route path='explore' element={<ExplorePage/>}/>
              <Route path='/:username' element={<ProfilePage/>}/>
              <Route path='settings' element={<Settings/>}/>
              <Route path='/post/:post_id' element={<ViewPost/>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
