import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CreateWorkOrder from "./Pages/Create-Work-Order/Create-Work-Order";
import SubNavbar from './Components/Sub-Navbars/Work-Order-Sub-Navbar/Work-Order-Sub-Navbar';
import General from './Pages/General/General';
import JobNotes from './Pages/Job-Notes/Job-Notes';
import BidCompletionNotes from './Pages/Bid-Completion-Notes/Bid-Completion-Notes';
import PhotosDocuments from './Pages/Photos-Documents/Photos-Documents';
import Invoice from './Pages/Invoice/Invoice';
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /> <Dashboard /></>
    },
    {
      path: "/Create-Work-Order",
      element: <><Navbar /> <CreateWorkOrder /></>
    },
    {
      path: "/General",
      element: <><Navbar /> <SubNavbar /> <General /></>
    },
    {
      path: "/Job-Notes",
      element: <><Navbar /> <SubNavbar /> <JobNotes /></>
    },
    {
      path: "/Bid-Completion-Notes",
      element: <><Navbar /> <SubNavbar /> <BidCompletionNotes /></>
    },
    {
      path: "/Photos-Documents",
      element: <><Navbar /> <SubNavbar /> <PhotosDocuments /></>
    },
    {
      path: "/Invoice",
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
