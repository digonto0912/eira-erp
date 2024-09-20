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
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /> <DashboardSubNavbar /> <Dashboard /></>
    },
    {
      path: "/WorkOrder",
      element: <><Navbar /> <FilterBox /></>
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
