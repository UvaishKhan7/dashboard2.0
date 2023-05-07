import React, { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, createTheme } from '@mui/material';
import { themeSettings } from 'theme';
import { useSelector } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from 'scenes/dashboard/Dashboard';
import Layout from 'scenes/layout/Layout';
import Login from 'scenes/login/Login';
import { isLogin } from 'utils/checkAuth';
import Clients from 'scenes/clients/Clients';
import EmployeesList from 'scenes/employeeDetails/EmployeesList';
import EmployeesWork from 'scenes/employeeDetails/EmployeesWork';
import EmployeesAttendance from 'scenes/employeeDetails/EmployeesAttendance';
import AddEmployee from 'scenes/addEmployee/AddEmployee';
import AddBdmWork from 'scenes/addBdmWork/AddBdmWork';
import AddDeveloperWork from 'scenes/addDeveloperWork/AddDeveloperWork';

const router = createBrowserRouter([
  { path: 'login', element: <Login /> },
  {
    loader: isLogin, element: <Layout />, children: [
      { path: '/', element: <Navigate to={`/dashboard`} replace /> },
      { path: '/*', element: <Navigate to={`/dashboard`} replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'clients', element: <Clients /> },
      { path: 'add_employee', element: <AddEmployee /> },
      { path: 'update_employee/:id', element: <AddEmployee /> },
      { path: 'employees list', element: <EmployeesList /> },
      { path: 'employees attendance', element: <EmployeesAttendance /> },
      { path: 'employees work', element: <EmployeesWork /> },
      { path: `bdmWorks`, element: <AddBdmWork /> },
      { path: `developerWorks`, element: <AddDeveloperWork /> },
    ]
  },

])

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
