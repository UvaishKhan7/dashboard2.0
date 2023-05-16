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
import AddBdmWork from 'scenes/addWorks/addBdmWork/AddBdmWork';
import AddDeveloperWork from 'scenes/addWorks/addDeveloperWork/AddDeveloperWork';
import FinanceDetails from 'scenes/financeDetails/FinanceDetails';
import AddFinanceDetail from 'scenes/addFinanceDetail/AddFinanceDetail';
import AddLeave from 'scenes/addLeave/AddLeave';
import Leaves from 'scenes/leaves/Leaves';
import YourLeaves from 'scenes/yourLeaves/YourLeaves';
import BDMWorks from 'scenes/employeeDetails/workDetails/BDMWorks';
import DeveloperWorks from 'scenes/employeeDetails/workDetails/DeveloperWorks';
import CWWorks from 'scenes/employeeDetails/workDetails/CWWorks';
import VideoEditorWorks from 'scenes/employeeDetails/workDetails/VideoEditorWorks';
import SSMWorks from 'scenes/employeeDetails/workDetails/SSMWorks';
import GDWorks from 'scenes/employeeDetails/workDetails/GDWorks';
import AddCwWork from 'scenes/addWorks/addCwWork/addCwWork';

const employeeId = localStorage.getItem("id")

const router = createBrowserRouter([
  { path: 'login', element: <Login /> },
  {
    loader: isLogin, element: <Layout />, children: [
      { path: '/', element: <Navigate to={`/employees/${employeeId}`} replace /> },
      { path: '/*', element: <Navigate to={`/employees/${employeeId}`} replace /> },
      { path: '/dashboard', element: <Navigate to={`/employees/${employeeId}`} replace /> },
      { path: `/employees/${employeeId}`, element: <Dashboard /> },
      { path: 'clients', element: <Clients /> },

      //employee routes
      { path: 'employees list', element: <EmployeesList /> },
      { path: 'add_employee', element: <AddEmployee /> },
      { path: 'update_employee/:id', element: <AddEmployee /> },

      { path: 'attendance details', element: <EmployeesAttendance /> },

      //Works details
      { path: 'work details', element: <EmployeesWork /> },
      { path: 'bdm works', element: <BDMWorks /> },
      { path: 'developer works', element: <DeveloperWorks /> },
      { path: 'content writer works', element: <CWWorks /> },
      { path: 'video editor works', element: <VideoEditorWorks /> },
      { path: 'social media manager works', element: <SSMWorks /> },
      { path: 'graphic designer works', element: <GDWorks /> },

      // finance routes
      { path: 'finance details', element: <FinanceDetails /> },
      { path: 'add_finance_details', element: <AddFinanceDetail /> },
      { path: 'update_finance_details/:id', element: <AddFinanceDetail /> },

      //leave routes
      { path: 'leaves details', element: <Leaves /> },
      { path: 'your leaves', element: <YourLeaves /> },
      { path: 'add_leave', element: <AddLeave /> },
      { path: 'update_leave/:id', element: <AddLeave /> },

      // adding or updating work routes
      { path: 'bdmWorks', element: <AddBdmWork /> },
      { path: 'bdmWorks/:id', element: <AddBdmWork /> },
      { path: 'developerWorks', element: <AddDeveloperWork /> },
      { path: 'developerWorks/:id', element: <AddDeveloperWork /> },
      { path: 'cwWorks', element: <AddCwWork /> },
      { path: 'cwWorks/:id', element: <AddCwWork /> },
      { path: 'ssmWorks', element: <AddDeveloperWork /> },
      { path: 'ssmWorks/:id', element: <AddDeveloperWork /> },
      { path: 'veWorks', element: <AddDeveloperWork /> },
      { path: 'veWorks/:id', element: <AddDeveloperWork /> },
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
