import './App.css'
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
import FilterBox from "./Pages/temp page/FilterBox";
import FilterBox2 from "./Pages/temp page/invoice";
import MainButton from './Pages/Main-Button/Main-Button';
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import UserType from './Pages/User-type/User-type';
import SignUpPage from './Pages/Signup-Page/Signup-Page';
import LoginPage from './Pages/Login-Page/Login-Page';

function App() {

  const router = createBrowserRouter([
    {
      // temp file
      path: "/",
      element: <><MainButton /></>
    },
    {
      path: "/DashBoard",
      element: <><Navbar /> <DashboardSubNavbar /> <Dashboard /></>
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
      // temp file
      path: "/WorkOrder",
      element: <><Navbar /> <FilterBox /> <FilterBox2 /> </>
    },
    {
      path: "/Create-Work-Order",
      element: <><Navbar /> <CreateWorkOrder /></>
    },
    {
      path: "/Control-Panel",
      element: <><Navbar /> <ControlPanel /></>
    },
    {
      path: "/Waiting-Payment",
      element: <><Navbar /> <WaitingPayment /></>
    },
    {
      path: "/Notification",
      element: <><Navbar /> <Notification /></>
    },
    {
      path: "/General/:id",
      element: <><Navbar /> <SubNavbar /> <General /></>
    },
    {
      path: "/Job-Notes/:id",
      element: <><Navbar /> <SubNavbar /> <JobNotes /></>
    },
    {
      path: "/Bid-Completion-Notes/:id",
      element: <><Navbar /> <SubNavbar /> <BidCompletionNotes /></>
    },
    {
      path: "/Photos-Documents/:id",
      element: <><Navbar /> <SubNavbar /> <PhotosDocuments /></>
    },
    {
      path: "/Invoice/:id",
      element: <><Navbar /> <SubNavbar /> <Invoice /></>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
