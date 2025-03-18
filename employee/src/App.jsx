import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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
function App() {

  return (
    <>
     <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Start />} />                
          <Route path='/adminlogin' element={ <Login />} />
          <Route path='/employee_login' element={<EmployeeLogin />} />
            <Route path='/employee_detail/:id' element={<EmployeeDetail />} />
          <Route path='/dashboard' element={
            <PrivateRoute>

              <Dashboard />
            </PrivateRoute>
            }>
            <Route path='' element={<Home />} />
            <Route path='/dashboard/employee' element={<Employee />} />
            <Route path='/dashboard/category' element={<Category />} />
            <Route path='/dashboard/profile' element={<Profile />} />
            <Route path='/dashboard/add-category' element={<AddCategory />} />
            <Route path='/dashboard/add_employee' element={<AddEmployee />} />
            <Route path='/dashboard/edit-employee/:id' element={<EditEmployee />} />
          </Route>

          {/* for toast */}
        
        <Route path="/employee/detail/:id" element={<EmployeeDetail />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} />

        
      </BrowserRouter>
      </CookiesProvider>
    </>
  )
}

export default App
