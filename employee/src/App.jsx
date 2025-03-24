import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import PrivateRoute from './Components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <BrowserRouter>
          <Routes>
            {/* Public route - Landing page */}
            <Route path='/' element={<Start />} />                

            {/* Login route - Redirect if logged in */}
            <Route path='/adminlogin' element={
              <PrivateRoute isPublic={true}>
                <Login />
              </PrivateRoute>
            } />

            {/* Employee login route - Redirect if logged in */}
            <Route path='/employee_login' element={
              <PrivateRoute isPublic={true}>
                <EmployeeLogin />
              </PrivateRoute>
            } />

            {/* Employee detail route */}
            <Route path='/employee_detail/:id' element={<EmployeeDetail />} />

            {/* Protected dashboard routes */}
            <Route path='/dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }>
              <Route index element={<Home />} />
              <Route path='employee' element={<Employee />} />
              <Route path='category' element={<Category />} />
              <Route path='profile' element={<Profile />} />
              <Route path='add-category' element={<AddCategory />} />
              <Route path='add_employee' element={<AddEmployee />} />
              <Route path='edit-employee/:id' element={<EditEmployee />} />
            </Route>
          </Routes>

          {/* Toast notification container */}
          <ToastContainer position="top-right" autoClose={5000} />
        </BrowserRouter>
      </CookiesProvider>
    </>
  );
}

export default App;
