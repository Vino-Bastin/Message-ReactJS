import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import MainLayout from "./layouts/MainLayout";
import Posts from "./components/Post/Posts";
import PostDetails from "./components/Post/PostDetails";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import NewPost from "./components/Post/NewPost";
import authApi from "./store/features/authSlice";

function App() {
  //* sending request to /auth/refresh endpoint for auto login
  store.dispatch(authApi.endpoints.refreshToken.initiate(0));

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Posts />} />
            <Route path="/home" element={<Posts />} />
            <Route path="/trending" element={<Posts />} />
            <Route path="/latest" element={<Posts />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Route>
          <Route path="*" element={<div>404 Not fount</div>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
