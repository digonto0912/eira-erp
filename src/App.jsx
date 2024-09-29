import './App.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import PrivateRoute from './Pages/Hooks/PrivateRoute';
import Navbar from "./Components/Navbar/Navbar";
import DashboardSubNavbar from "./Components/Sub-Navbars/Dashboard-Sub-Navbars/Dashboard-Sub-Navbar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CreateWorkOrder from "./Pages/Create-Work-Order/Create-Work-Order";
import ControlPanel from './Pages/Control-Panel/Control-Panel';
import WaitingPayment from "./Pages/Waiting-Payment/Waiting-payment";
import Notification from "./Pages/Notification/Notification";
import SubNavbar from './Components/Sub-Navbars/Work-Order-Sub-Navbar/Work-Order-Sub-Navbar';
import General from './Pages/General/General';
import JobNotes from './Pages/Job-Notes/Job-Notes';
import BidCompletionNotes from './Pages/Bid-Completion-Notes/Bid-Completion-Notes';
import PhotosDocuments from './Pages/Photos-Documents/Photos-Documents';
import Invoice from './Pages/Invoice/Invoice';
import MainButton from './Pages/Main-Button/Main-Button';
import UserType from './Pages/User-type/User-type';
import SignUpPage from './Pages/Signup-Page/Signup-Page';
import LoginPage from './Pages/Login-Page/Login-Page';
import Unauthorized from './Pages/Unauthorized/Unauthorized';

function App() {

  const router = createBrowserRouter([
    {
      // temp file
      path: "/WorkOrder",
      element: <>
        <PrivateRoute allowedUserTypes={['Office', 'Field', 'Client']}>
          <Navbar />
        </PrivateRoute>
      </>
    },
    {
      // temp file
      path: "/",
      element: <><MainButton /></>
    },
    {
      path: "/User-Type/:Input_Type",
      element: <><UserType /></>
    },
    {
      path: "/Signup/:type",
      element: <><SignUpPage /></>
    },
    {
      path: "/Login/:type",
      element: <><LoginPage /></>
    },
    {
      path: "/DashBoard",
      element: <>
        <PrivateRoute allowedUserTypes={['Office', 'Field', 'Client']}>
          <Navbar /> <DashboardSubNavbar /> <Dashboard />
        </PrivateRoute>
      </>
    },
    {
      path: "/Create-Work-Order",
      element: <>
        <PrivateRoute allowedUserTypes={['Office']}>
          <Navbar /> <CreateWorkOrder />
        </PrivateRoute>
      </>

    },
    {
      path: "/Control-Panel",
      element: <>
        <PrivateRoute allowedUserTypes={['Office']}>
          <Navbar /> <ControlPanel />
        </PrivateRoute>
      </>
    },
    {
      path: "/Waiting-Payment",
      element: <>
        <PrivateRoute allowedUserTypes={['Office', 'Field', 'Client']}>
          <Navbar /> <WaitingPayment />
        </PrivateRoute>
      </>
    },
    {
      path: "/Notification",
      element: <>
        <PrivateRoute allowedUserTypes={['Office', 'Field', 'Client']}>
          <Navbar /> <Notification />
        </PrivateRoute>
      </>
    },
    {
      path: "/General/:id",
      element: <>
        <PrivateRoute allowedUserTypes={['Office', 'Field', 'Client']}>
          <Navbar /> <SubNavbar /> <General />
        </PrivateRoute>
      </>
    },
    {
      path: "/Job-Notes/:id",
      element: <>
        <PrivateRoute allowedUserTypes={['Office', 'Field', 'Client']}>
          <Navbar /> <SubNavbar /> <JobNotes />
        </PrivateRoute>
      </>
    },
    {
      path: "/Bid-Completion-Notes/:id",
      element: <>
        <PrivateRoute allowedUserTypes={['Office']}>
          <Navbar /> <SubNavbar /> <BidCompletionNotes />
        </PrivateRoute>
      </>
    },
    {
      path: "/Photos-Documents/:id",
      element: <>
        <PrivateRoute allowedUserTypes={['Office', 'Field', 'Client']}>
          <Navbar /> <SubNavbar /> <PhotosDocuments />
        </PrivateRoute>
      </>
    },
    {
      path: "/Invoice/:id",
      element: <>
        <PrivateRoute allowedUserTypes={['Office']}>
          <Navbar /> <SubNavbar /> <Invoice />
        </PrivateRoute>
      </>
    },
    {
      path: "/Unauthorized",
      element: <> <Unauthorized /> </>
    },
    {
      path: "*",
      element: <>404</>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
