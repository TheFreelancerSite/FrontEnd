import './App.scss'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import AddService from './components/AddService/AddService';
import Servicee from './Pages/Servicee/Servicee';
import MyServices from './Pages/MyServices/MyServices';
import AddService from './Pages/AddService/AddService';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/footer/Footer'
import Orders from './components/orders/Orders'
import Signup from './Pages/Signup/Signup'
import Signin from './Pages/Signin/Signin'
import Home from './Pages/home/Home'
import FreelancerHomePage from './pages/FreelancerHomePage/FreelancerHomePage';
import ClientHomePage from './pages/ClientHomePage/ClientHomePage';
import UserApplicants from './pages/userApplicants/UserApplicants';
import Profile from './Pages/Profile/Profile';
import { useState } from 'react';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import ServiceFeedback from './pages/ServiceFeedback/ServiceFeedback';
import Payment from './Pages/Payment/Payment';
import Completion from './components/completion/Completion';

function App() {
  const [showModal, setShowModal] = useState(false);
  const[success,setSuccess]=useState(false)

  const handleSuccess =()=>{
    setSuccess(true)
  }
  const toggleModal = () => {
    setShowModal(!showModal);
  };;
  const Layout = () => {
    return (
      <div className="app">
        <Navbar onJoinClick={toggleModal} />
        <Outlet />  
        <Footer />
      </div>
    );
  };
  const userId = localStorage.getItem("userId")
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home showModal={showModal} setShowModal={setShowModal} />,
        },
        // {
        //   path: "/servicess",
        //   element: <Servicess />,
        // },
        {
          path: "/myServices",
          element: <MyServices />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id/:interactedWith",
          element: <Message />,
        },
        {
          path: "/add",
          element: <AddService />,
        },
        {
          path: "/Servicee/:id",
          element: <Servicee />,
        },
        {path:"/freelancerHomePage",
        element :<FreelancerHomePage />
        },
        {
          path :"/clientHomePage",
          element: <ClientHomePage/>
        },

        {
          path:"/services",
          element:<MyServices /> 
        },
        {
          path:"/applicant/:serviceId",
          element:<UserApplicants success={success} /> 
        },
      
        {
          path:`/serviceFeedback/:serviceId/:applicantId`,
          element:<ServiceFeedback /> 
        },
        {
          path:`/Payment/:clientId/:freelancerId/:serviceId`,
          element:<Payment /> 
        },
        {
          path :`completion/:clientId/:freelancerId/:serviceId`,
          element:<Completion handleSuccess={handleSuccess} />
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Signin />,
        },
      ],
    },
    {
      path:`/profil/:userId`,
      element:<Profile /> 
    },
  ]);
  
    return <RouterProvider router={router} />;
  
  
}
  


export default App
