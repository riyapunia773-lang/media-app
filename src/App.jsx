import Logout from './views/Logout';
import Login from './views/Login';
import {BrowserRouter, Routes, Route} from 'react-router';
import Layout from './components/Layout';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import {UserProvider} from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
            <Route path="/upload" element={<Upload />} />
            <Route path="/single" element={<Single />} />
            
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;