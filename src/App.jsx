import './App.scss'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import AddService from './components/AddService/AddService';
import Servicee from './Pages/Servicee/Servicee';
import MyServices from './Pages/MyServices/MyServices';
import AddService from './pages/AddService/AddService';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/footer/Footer'
import Orders from './components/orders/Orders'
import Signup from './pages/Signup/signup'
import Signin from './pages/Signin/Signin'
import Home from './pages/home/Home'




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
