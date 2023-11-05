import './App.scss'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer';
import Orders from './components/orders/Orders';
import Servicess from './pages/Servicess/Servicess';
import AddService from './pages/AddService/AddService';
import Servicee from './pages/Servicee/Servicee';
import MyServices from './pages/MyServices/MyServices';
import Signup from './pages/Signup/signup'
import Signin from './pages/Signin/Signin'
import Home from './pages/home/Home'
import FreelancerHomePage from './pages/FreelancerHomePage/FreelancerHomePage';
import ClientHomePage from './pages/ClientHomePage/ClientHomePage';




function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
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
        // {
        //   path: "/messages",
        //   element: <Messages />,
        // },
        // {
        //   path: "/message/:id",
        //   element: <Message />,
        // },
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
        }
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Signin />,
    },
  ]);
  
    return <RouterProvider router={router} />;
  
  
}
  


export default App
